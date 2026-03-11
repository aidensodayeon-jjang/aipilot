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
echo -e "${CYAN}    EduPilot 아키텍처 정밀 교정 실행기    ${NC}"
echo -e "${CYAN}=======================================${NC}"

# 1. 아키텍처 확인 및 경로 강제
ARCH_NAME=$(node -p "process.arch")
IS_ROSETTA=$(sysctl -in sysctl.proc_translated)

echo -e "${BLUE}현재 아키텍처 :${NC} darwin-$ARCH_NAME"
if [ "$IS_ROSETTA" = "1" ]; then
    echo -e "${RED}[경고] 현재 터미널이 Rosetta(인텔 모드)로 실행 중입니다!${NC}"
    echo -e "${YELLOW}가장 좋은 방법은 터미널 정보창에서 'Rosetta를 사용하여 열기'를 끄는 것입니다.${NC}"
fi

# M1 전용 경로 최우선 설정
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

# 2. 포트 정리
for port in 8000 3030 3015; do
    pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then kill -9 $pid 2>/dev/null; fi
done

# 3. 키오스크(3015) 긴급 교정
if [ -d "$KIOSK_DIR" ]; then
    echo -e "${YELLOW}[Step 1] 키오스크 네이티브 모듈 교정 중...${NC}"
    cd "$KIOSK_DIR"
    # lightningcss가 요구하는 아키텍처 바이너리 강제 설치
    npm install --platform=darwin --arch=$ARCH_NAME lightningcss --save-dev --force > /dev/null 2>&1
    rm -rf .next
fi

# 4. 프론트엔드(3030) esbuild 교정
echo -e "${YELLOW}[Step 2] 프론트엔드 esbuild 교정 중...${NC}"
cd "$FRONTEND_DIR"
npm install esbuild --save-dev --force > /dev/null 2>&1

# 5. 종료 처리
cleanup() {
    echo -e "\n\n${RED}모든 서버를 종료합니다...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}
trap cleanup SIGINT

# 6. 백엔드 실행
echo -e "\n${BLUE}[Step 3] 백엔드(Django) 시작 중...${NC}"
cd "$BACKEND_DIR"
source .venv/bin/activate
./.venv/bin/python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local &

# 7. 프론트엔드 실행
echo -e "${GREEN}[Step 4] 프론트엔드(React) 시작 중...${NC}"
cd "$FRONTEND_DIR"
./node_modules/.bin/vite --port 3030 --host 0.0.0.0 &

# 8. 키오스크 실행
if [ -d "$KIOSK_DIR" ]; then
    echo -e "${CYAN}[Step 5] 키오스크(Next.js) 시작 중...${NC}"
    cd "$KIOSK_DIR"
    PORT=3015 ./node_modules/.bin/next dev &
fi

echo -e "\n${GREEN}모든 교정 및 서버 구동이 완료되었습니다!${NC}"
echo -e "${YELLOW}대시보드 : http://localhost:3030${NC}"
echo -e "${YELLOW}키오스크 : http://localhost:3015${NC}\n"

wait
