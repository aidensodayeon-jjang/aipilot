#!/bin/bash

# 프로젝트 최상위 디렉토리로 이동
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "Starting EduPilot Servers..."

# 쉘 스크립트 종료 시 백그라운드 프로세스도 함께 종료하도록 설정
cleanup() {
    echo -e "\nStopping servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit
}

# Ctrl+C (SIGINT) 또는 SIGTERM 신호를 받으면 cleanup 함수 실행
trap cleanup SIGINT SIGTERM

# 백엔드 서버 (Django) 실행
echo "Starting Backend (Django)..."
cd "$DIR/edupilot-backend"
source .venv/bin/activate
# 명시적으로 local.py 설정 파일을 사용하도록 지정
python manage.py runserver --settings=backend.settings.local &
BACKEND_PID=$!

# 프론트엔드 서버 (Vite) 실행
echo "Starting Frontend (Vite)..."
cd "$DIR/edupilot-frontend"

# yarn이 없으면 npm run dev를 사용
if ! command -v yarn &> /dev/null
then
    echo "yarn command not found. Using npm run dev instead..."
    npm run dev:host &
else
    yarn dev:host &
fi
FRONTEND_PID=$!

echo "========================================="
echo "Servers are running!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press [Ctrl+C] to stop all servers."
echo "========================================="

# 백그라운드 프로세스들이 종료될 때까지 대기
wait
