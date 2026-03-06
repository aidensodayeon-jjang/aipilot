#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}   EduPilot 통합 개발 환경 시작      ${NC}"
echo -e "${BLUE}=======================================${NC}"

# 백엔드 실행 함수
start_backend() {
    echo -e "${GREEN}[Backend]${NC} 가상환경 활성화 및 서버 실행 중..."
    cd edupilot-backend
    source .venv/bin/activate
    # requirements 설치는 선택 사항 (속도를 위해 제외하거나 필요시 추가)
    # pip install -r requirements.txt
    python manage.py runserver 0.0.0.0:8000 &
    BACKEND_PID=$!
    cd ..
}

# 프론트엔드 실행 함수
start_frontend() {
    echo -e "${GREEN}[Frontend]${NC} 의존성 확인 및 서버 실행 중..."
    cd edupilot-frontend
    # yarn이 문제가 있을 경우 npm 사용
    if command -v yarn &> /dev/null && [ "$(yarn -v | grep -c "Segmentation fault")" -eq 0 ]; then
        yarn dev &
    else
        npm run dev &
    fi
    FRONTEND_PID=$!
    cd ..
}

# 종료 처리
cleanup() {
    echo -e "\n${BLUE}서버를 종료합니다...${NC}"
    kill $BACKEND_PID $FRONTEND_PID
    exit
}

trap cleanup SIGINT

# 실행
start_backend
sleep 2 # 백엔드 안정화 대기
start_frontend

echo -e "${BLUE}=======================================${NC}"
echo -e "${GREEN}백엔드: http://localhost:8000${NC}"
echo -e "${GREEN}프론트엔드: http://localhost:3030${NC}"
echo -e "${BLUE}종료하려면 Ctrl+C를 누르세요.${NC}"
echo -e "${BLUE}=======================================${NC}"

# 프로세스 유지
wait
