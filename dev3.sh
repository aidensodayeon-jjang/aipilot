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
ATTEND_DIR="$BACKEND_DIR/attend"

echo -e "${CYAN}=======================================${NC}"
echo -e "${CYAN}    EduPilot V3 (New Attend) 실행기    ${NC}"
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
echo -e "${YELLOW}기존 포트(8000, 3030, 3015, 3001) 점검 및 정리 중...${NC}"
for port in 8000 3030 3015 3001; do
    pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then 
        echo -e "${RED}포트 $port 사용 중인 프로세스($pid) 종료${NC}"
        kill -9 $pid 2>/dev/null
    fi
done

# 3. 프론트엔드(3030) 네이티브 모듈 교정
echo -e "\n${YELLOW}[Step 1] 프론트엔드(React) 네이티브 모듈 교정 중...${NC}"
cd "$FRONTEND_DIR"
yarn add @swc/core esbuild --dev --force --ignore-engines > /dev/null 2>&1
echo -e "${GREEN}프론트엔드 교정 완료${NC}"

# 4. 신규 출석체크(3001) 네이티브 모듈 교정 및 의존성 설치
if [ -d "$ATTEND_DIR" ]; then
    echo -e "\n${YELLOW}[Step 2] 신규 출석체크(Attend) 의존성 확인 중...${NC}"
    cd "$ATTEND_DIR"
    # 의존성 설치 여부 확인 및 설치 (버전 체크 무시 옵션 추가)
    if [ ! -d "node_modules" ]; then
        echo -e "${BLUE}node_modules가 없습니다. 설치를 시작합니다...${NC}"
        yarn install --ignore-engines > /dev/null 2>&1
    fi
    echo -e "${GREEN}신규 출석체크 준비 완료${NC}"
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
./node_modules/.bin/vite --port 3030 --host 0.0.0.0 &

# 8. 신규 출석체크(Attend) 실행
if [ -d "$ATTEND_DIR" ]; then
    echo -e "${CYAN}[Step 5] 신규 출석체크(Attend) 시작 중 (Port: 3001)...${NC}"
    cd "$ATTEND_DIR"
    # vite 명령어를 찾지 못하는 경우를 대비해 직접 경로 사용
    if [ -f "./node_modules/.bin/vite" ]; then
        ./node_modules/.bin/vite --port 3001 --host 0.0.0.0 &
    else
        echo -e "${YELLOW}vite를 찾을 수 없어 의존성을 다시 설치합니다...${NC}"
        yarn install && ./node_modules/.bin/vite --port 3001 --host 0.0.0.0 &
    fi
fi

echo -e "\n${GREEN}=======================================${NC}"
echo -e "${GREEN}  V3 시스템 구동이 완료되었습니다!  ${NC}"
echo -e "${YELLOW}  대시보드 : http://localhost:3030${NC}"
echo -e "${YELLOW}  신규 출결 : http://localhost:3001${NC}"
echo -e "${GREEN}=======================================${NC}\n"

wait
