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

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}       EduPilot 통합 개발 서버 시작      ${NC}"
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

# 2. 백엔드 준비
echo -e "\n${GREEN}[1/2] 백엔드(Django) 준비 중...${NC}"
cd "$BACKEND_DIR"

if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}[Info]${NC} 가상환경(.venv)이 없습니다. 생성을 시도합니다..."
    python3 -m venv .venv
fi

source .venv/bin/activate
# 의존성 설치 여부 간단 체크 (requirements.txt 기준)
# pip install -r requirements.txt # 매번 실행하면 느릴 수 있으므로 필요시 주석 해제

# 3. 프론트엔드 준비
echo -e "${GREEN}[2/2] 프론트엔드(React/Vite) 준비 중...${NC}"
cd "$FRONTEND_DIR"

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[Info]${NC} 의존성 패키지(node_modules)가 없습니다. 설치를 시작합니다..."
    if command -v yarn &> /dev/null; then
        yarn install
    else
        npm install
    fi
fi

# 4. 서버 동시 실행 및 로그 관리
echo -e "\n${BLUE}=======================================${NC}"
echo -e "${GREEN}서버를 실행합니다. (종료: Ctrl+C)${NC}"
echo -e "${GREEN}백엔드: http://localhost:8000${NC}"
echo -e "${GREEN}프론트엔드: http://localhost:3030${NC}"
echo -e "${BLUE}=======================================${NC}\n"

# 종료 처리 함수
cleanup() {
    echo -e "\n\n${YELLOW}서버를 종료하는 중입니다...${NC}"
    [ ! -z "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null
    [ ! -z "$FRONTEND_PID" ] && kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}모든 서버가 종료되었습니다.${NC}"
    exit
}

trap cleanup SIGINT

# 백엔드 실행
cd "$BACKEND_DIR"
# 가상환경의 파이썬을 직접 사용하여 실행 (가장 확실한 방법)
./.venv/bin/python manage.py runserver 0.0.0.0:8000 --settings=backend.settings.local > backend.log 2>&1 &
BACKEND_PID=$!

# 프론트엔드 실행
cd "$FRONTEND_DIR"
if command -v yarn &> /dev/null; then
    yarn dev > frontend.log 2>&1 &
else
    npm run dev > frontend.log 2>&1 &
fi
FRONTEND_PID=$!

# 로그 출력을 보며 대기
wait
