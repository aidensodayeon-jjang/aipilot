#!/bin/bash

echo "백엔드와 프론트엔드 개발 서버를 시작합니다..."

# Function to kill process on a given port
kill_port() {
    PORT=$1
    PID=$(lsof -t -i :$PORT)
    if [ -n "$PID" ]; then
        echo "Killing process on port $PORT (PID: $PID)"
        kill -9 $PID
    fi
}

echo "기존 서버를 종료합니다..."
kill_port 8000 # Django backend default port
kill_port 3000 # Vite frontend default port
sleep 2 # Give some time for ports to release

echo "2개의 새로운 터미널 탭이 열립니다."

# 현재 스크립트가 실행되는 디렉토리의 절대 경로를 가져옵니다.
BASE_DIR=$(pwd)

# 백엔드 실행 명령어
BACKEND_CMD="cd '${BASE_DIR}/edupilot-backend' && source .venv/bin/activate && echo '--- BACKEND SERVER ---' && python manage.py runserver"

# 프론트엔드 실행 명령어
FRONTEND_CMD="cd '${BASE_DIR}/edupilot-frontend' && echo '--- FRONTEND SERVER ---' && yarn dev"

# 새 터미널 탭에서 백엔드 실행
osascript -e "tell application \"Terminal\" to do script \"${BACKEND_CMD}\""

# 새 터미널 탭에서 프론트엔드 실행
osascript -e "tell application \"Terminal\" to do script \"${FRONTEND_CMD}\""

echo "스크립트 실행이 완료되었습니다. 새로 열린 터미널 탭을 확인해주세요."

