#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$BASE_DIR/edupilot-backend"
FRONTEND_DIR="$BASE_DIR/edupilot-frontend"
KIOSK_DIR="$BASE_DIR/edupilot-kiosk"

echo -e "${CYAN}=======================================${NC}"
echo -e "${CYAN}    EduPilot 시스템 정밀 교정 및 실행기    ${NC}"
echo -e "${CYAN}=======================================${NC}"

# 1. 아키텍처 확인
ARCH_NAME=$(node -p "process.arch")
PLATFORM=$(node -p "process.platform")

echo -e "${BLUE}현재 아키텍처 :${NC} $PLATFORM-$ARCH_NAME"

# M1/M2/M3(arm64) 전용 경로 설정
if [ "$ARCH_NAME" = "arm64" ]; then
    export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
fi

# 2. 포트 정리 (기존 실행 중인 서버 종료)
echo -e "${YELLOW}기존 포트(8000, 3030, 3015) 점검 및 정리 중...${NC}"
for port in 8000 3030 3015; do
    pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then 
        echo -e "${RED}포트 $port 사용 중인 프로세스($pid) 종료${NC}"
        kill -9 $pid 2>/dev/null
    fi
done

# 3. 프론트엔드(3030) 네이티브 모듈 교정
echo -e "\n${YELLOW}[Step 1] 프론트엔드(React) 네이티브 모듈 교정 중...${NC}"
cd "$FRONTEND_DIR"
# @swc/core와 esbuild의 네이티브 바인딩 오류 해결을 위해 강제 설치
yarn add @swc/core esbuild --dev --force > /dev/null 2>&1
echo -e "${GREEN}프론트엔드 교정 완료${NC}"

# 4. 키오스크(3015) 네이티브 모듈 교정
if [ -d "$KIOSK_DIR" ]; then
    echo -e "\n${YELLOW}[Step 2] 키오스크(Next.js) 네이티브 모듈 교정 중...${NC}"
    cd "$KIOSK_DIR"
    # lightningcss 바이너리 오류 해결을 위해 강제 설치
    npm install lightningcss --save-dev --force > /dev/null 2>&1
    rm -rf .next
    echo -e "${GREEN}키오스크 교정 완료${NC}"
fi

# 5. 종료 처리 함수
cleanup() {
    echo -e "\n\n${RED}모든 서버를 종료합니다...${NC}"
    # 백그라운드 작업 종료
    kill $(jobs -p) 2>/dev/null
    exit
}
trap cleanup SIGINT

# 6. 백엔드 실행
echo -e "\n${BLUE}[Step 3] 백엔드(Django) 시작 중 (Port: 8000)...${NC}"
cd "$BACKEND_DIR"
if [ -d ".venv" ]; then
    source .venv/bin/activate
    python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local &
else
    echo -e "${RED}오류: 백엔드 가상환경(.venv)이 없습니다.${NC}"
fi

# 7. 프론트엔드 실행
echo -e "${GREEN}[Step 4] 프론트엔드(React) 시작 중 (Port: 3030)...${NC}"
cd "$FRONTEND_DIR"
yarn dev --port 3030 --host 0.0.0.0 &

# 8. 키오스크 실행
if [ -d "$KIOSK_DIR" ]; then
    echo -e "${CYAN}[Step 5] 키오스크(Next.js) 시작 중 (Port: 3015)...${NC}"
    cd "$KIOSK_DIR"
    npm run dev &
fi

echo -e "\n${GREEN}=======================================${NC}"
echo -e "${GREEN}  모든 서버 구동이 완료되었습니다!  ${NC}"
echo -e "${YELLOW}  대시보드 : http://localhost:3030${NC}"
echo -e "${YELLOW}  키오스크 : http://localhost:3015${NC}"
echo -e "${GREEN}=======================================${NC}\n"

wait
