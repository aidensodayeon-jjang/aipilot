#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 프로젝트 경로 설정
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$BASE_DIR/edupilot-backend"
FRONTEND_DIR="$BASE_DIR/edupilot-frontend"
KIOSK_DIR="/Users/aiden/Desktop/프로젝트/timetable/dlab-attendance"

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}       EduPilot 통합 서비스 시작         ${NC}"
echo -e "${BLUE}=======================================${NC}"

# 포트 점유 확인 및 정리 함수
check_port() {
    local port=$1
    local name=$2
    local pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then
        echo -e "${YELLOW}[Warning]${NC} $name($port) 포트가 이미 사용 중입니다. (PID: $pid)"
        read -p "기존 프로세스를 종료하고 다시 시작할까요? (y/n): " confirm
        if [[ $confirm == [yY] ]]; then
            kill -9 $pid
            echo -e "${GREEN}[Success]${NC} 기존 프로세스를 종료했습니다."
        else
            echo -e "${RED}[Error]${NC} 포트가 이미 사용 중입니다. 실행을 중단합니다."
            exit 1
        fi
    fi
}

# 1. 포트 확인
check_port 8000 "Backend"
check_port 3030 "Frontend"
check_port 3001 "Kiosk"

# 2. 백엔드 준비
echo -e "\n${GREEN}[1/3] 백엔드(Django) 준비 중...${NC}"
cd "$BACKEND_DIR"
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}[Info]${NC} 가상환경이 없습니다. 생성을 시도합니다..."
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
fi

# 3. 프론트엔드 준비
echo -e "${GREEN}[2/3] 프론트엔드(React) 준비 중...${NC}"
cd "$FRONTEND_DIR"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[Info]${NC} 프론트엔드 의존성 설치 중..."
    npm install
fi

# 4. 키오스크 준비
echo -e "${GREEN}[3/3] 키오스크(Next.js) 준비 중...${NC}"
cd "$KIOSK_DIR"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[Info]${NC} 키오스크 의존성 설치 중..."
    npm install
fi

# 5. 서버 동시 실행 및 로그 관리
echo -e "\n${BLUE}=======================================${NC}"
echo -e "${GREEN}모든 서버를 실행합니다. (종료: Ctrl+C)${NC}"
echo -e "${GREEN}백엔드: http://localhost:8000${NC}"
echo -e "${GREEN}프론트엔드: http://localhost:3030${NC}"
echo -e "${GREEN}키오스크: http://localhost:3001${NC}"
echo -e "${BLUE}=======================================${NC}\n"

# 종료 처리 함수
cleanup() {
    echo -e "\n\n${YELLOW}모든 서버를 종료하는 중입니다...${NC}"
    [ ! -z "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null
    [ ! -z "$FRONTEND_PID" ] && kill $FRONTEND_PID 2>/dev/null
    [ ! -z "$KIOSK_PID" ] && kill $KIOSK_PID 2>/dev/null
    echo -e "${GREEN}종료 완료.${NC}"
    exit
}

trap cleanup SIGINT

# 백엔드 실행
cd "$BACKEND_DIR"
./.venv/bin/python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local > backend.log 2>&1 &
BACKEND_PID=$!

# 프론트엔드 실행
cd "$FRONTEND_DIR"
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

# 키오스크 실행
cd "$KIOSK_DIR"
PORT=3001 npm run dev > kiosk.log 2>&1 &
KIOSK_PID=$!

# 로그 모니터링 (선택 사항)
echo "로그 파일들이 생성되었습니다: backend.log, frontend.log, kiosk.log"
wait
