import type { Student, Announcement } from './types';

export const studentsData: Student[] = [
  {
    "id": "student-1057",
    "name": "윤지효",
    "password": "3234",
    "age": "초5",
    "school": "영도초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DC-3D",
      "title": "3D모델링",
      "level": "중급",
      "description": "3D 모델링의 기본 개념부터 실제 모델 제작까지 배우는 실습 중심의 과정입니다.  \nTinkerCAD  도구를 활용하여 창의적인 아이디어를 3차원으로 구현하며,  \n디지털 제작 역량과 공간 사고력을 함께 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "기본 도형을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "포물선을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "패턴을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "3D 프린팅 개념과 실습",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "지지대를 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "치수를 고려한 실용 모델 제작",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "다양한 모양의 3D 모델 구현",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "기어 구조물 모델링과 설계",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "나만의 창작 프로젝트 설계",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "3D 모델링 출력 실습 및 보정",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "최종 발표 및 작품 피드백",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DC_RX_01",
        "title": "로블록스기본",
        "level": "초급",
        "description": "로블록스를 활용한 3D 메타버스 콘텐츠 제작과 Lua 기반 스크립트 코딩의 기초를 배웁니다. 장애물 게임 만들기부터 인터랙션, 인터페이스 구현, 게임 출시에 이르기까지 실습 중심의 학습을 통해 창의력과 논리력을 함께 키울 수 있는 과정입니다."
      },
      {
        "id": "DC_RX_02",
        "title": "로블록스메이커",
        "level": "중급",
        "description": "로블록스 메이커 과정은 Lua 스크립트를 본격적으로 활용하여 게임 개발 능력을 심화시키는 과정입니다"
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM202",
        "title": "아두이노 기본",
        "level": "중급",
        "description": "아두이노의 구조와 입출력 기초를 배우고, 센서와 액츄에이터를 활용한 프로젝트를 수행하는 입문 과정입니다."
      },
      {
        "id": "DM203",
        "title": "아두이노 메이킹",
        "level": "고급",
        "description": "센서와 모듈을 활용해 창작형 메이킹 프로젝트를 완성하는 아두이노 심화 과정입니다"
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1058",
    "name": "최민호",
    "password": "0751",
    "age": "초5",
    "school": "서강초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM203",
      "title": "아두이노 메이킹",
      "level": "고급",
      "description": "센서와 모듈을 활용해 창작형 메이킹 프로젝트를 완성하는 아두이노 심화 과정입니다",
      "progress": [
        {
          "week": 1,
          "topic": "블루투스 모듈(HC-06) 세팅 및 음성 제어",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "서보모터 앱 제어",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "LED 무드등 프로젝트 (1)",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "LED 무드등 프로젝트 (2)",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "LED 무드등 프로젝트 (3)",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "미세먼지 알림장치 (1)",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "미세먼지 알림장치 (2)",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "블루투스 RC카 만들기 (1)",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "블루투스 RC카 만들기 (2)",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "블루투스 RC카 만들기 (3)",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "아두이노로 공모전 나가보기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM202",
        "title": "아두이노 기본",
        "level": "중급",
        "description": "아두이노의 구조와 입출력 기초를 배우고, 센서와 액츄에이터를 활용한 프로젝트를 수행하는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1059",
    "name": "정제현",
    "password": "6093",
    "age": "초6",
    "school": "이대부초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM203",
      "title": "아두이노 메이킹",
      "level": "고급",
      "description": "센서와 모듈을 활용해 창작형 메이킹 프로젝트를 완성하는 아두이노 심화 과정입니다",
      "progress": [
        {
          "week": 1,
          "topic": "블루투스 모듈(HC-06) 세팅 및 음성 제어",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "서보모터 앱 제어",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "LED 무드등 프로젝트 (1)",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "LED 무드등 프로젝트 (2)",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "LED 무드등 프로젝트 (3)",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "미세먼지 알림장치 (1)",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "미세먼지 알림장치 (2)",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "블루투스 RC카 만들기 (1)",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "블루투스 RC카 만들기 (2)",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "블루투스 RC카 만들기 (3)",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "아두이노로 공모전 나가보기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "마인크래프트",
        "title": "마인크래프트 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM202",
        "title": "아두이노 기본",
        "level": "중급",
        "description": "아두이노의 구조와 입출력 기초를 배우고, 센서와 액츄에이터를 활용한 프로젝트를 수행하는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1060",
    "name": "이시현",
    "password": "8768",
    "age": "초6",
    "school": "양명초등학교",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DC-3D",
      "title": "3D모델링",
      "level": "중급",
      "description": "3D 모델링의 기본 개념부터 실제 모델 제작까지 배우는 실습 중심의 과정입니다.  \nTinkerCAD  도구를 활용하여 창의적인 아이디어를 3차원으로 구현하며,  \n디지털 제작 역량과 공간 사고력을 함께 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "기본 도형을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "포물선을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "패턴을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "3D 프린팅 개념과 실습",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "지지대를 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "치수를 고려한 실용 모델 제작",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "다양한 모양의 3D 모델 구현",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "기어 구조물 모델링과 설계",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "나만의 창작 프로젝트 설계",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "3D 모델링 출력 실습 및 보정",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "최종 발표 및 작품 피드백",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC101",
        "title": "DC101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DC_RX_01",
        "title": "로블록스기본",
        "level": "초급",
        "description": "로블록스를 활용한 3D 메타버스 콘텐츠 제작과 Lua 기반 스크립트 코딩의 기초를 배웁니다. 장애물 게임 만들기부터 인터랙션, 인터페이스 구현, 게임 출시에 이르기까지 실습 중심의 학습을 통해 창의력과 논리력을 함께 키울 수 있는 과정입니다."
      },
      {
        "id": "DS103",
        "title": "AI코디니",
        "level": "초급",
        "description": "AI코디니 과정으로 학생코딩경진대회 준비하는 수업과정"
      },
      {
        "id": "DM202",
        "title": "아두이노 기본",
        "level": "중급",
        "description": "아두이노의 구조와 입출력 기초를 배우고, 센서와 액츄에이터를 활용한 프로젝트를 수행하는 입문 과정입니다."
      },
      {
        "id": "DM203",
        "title": "아두이노 메이킹",
        "level": "고급",
        "description": "센서와 모듈을 활용해 창작형 메이킹 프로젝트를 완성하는 아두이노 심화 과정입니다"
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1062",
    "name": "조수현",
    "password": "9068",
    "age": "초5",
    "school": "등마초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-2",
      "title": "파이썬심화",
      "level": "중급",
      "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "터틀 그래픽 시작하기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "함수 기초 ①",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "함수 기초 ②",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "함수 기초 ③",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "로봇 그리기 프로젝트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "수수께끼 게임 만들기",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "사자성어 게임",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "계산기 앱 만들기",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "사과 먹기 게임",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "매치 메이커 프로젝트",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Final 미션 (종합 프로젝트)",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1063",
    "name": "권유찬",
    "password": "3303",
    "age": "초5",
    "school": "영동초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-2",
      "title": "파이썬심화",
      "level": "중급",
      "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "터틀 그래픽 시작하기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "함수 기초 ①",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "함수 기초 ②",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "함수 기초 ③",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "로봇 그리기 프로젝트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "수수께끼 게임 만들기",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "사자성어 게임",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "계산기 앱 만들기",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "사과 먹기 게임",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "매치 메이커 프로젝트",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Final 미션 (종합 프로젝트)",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1064",
    "name": "이서준B",
    "password": "0976",
    "age": "초6",
    "school": "월촌초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-2",
      "title": "파이썬심화",
      "level": "중급",
      "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "터틀 그래픽 시작하기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "함수 기초 ①",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "함수 기초 ②",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "함수 기초 ③",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "로봇 그리기 프로젝트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "수수께끼 게임 만들기",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "사자성어 게임",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "계산기 앱 만들기",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "사과 먹기 게임",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "매치 메이커 프로젝트",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Final 미션 (종합 프로젝트)",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1065",
    "name": "안시엘",
    "password": "3411",
    "age": "초5",
    "school": "경인초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-2",
      "title": "파이썬심화",
      "level": "중급",
      "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "터틀 그래픽 시작하기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "함수 기초 ①",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "함수 기초 ②",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "함수 기초 ③",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "로봇 그리기 프로젝트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "수수께끼 게임 만들기",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "사자성어 게임",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "계산기 앱 만들기",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "사과 먹기 게임",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "매치 메이커 프로젝트",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Final 미션 (종합 프로젝트)",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "마인크래프트",
        "title": "마인크래프트 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1066",
    "name": "김지황",
    "password": "0304",
    "age": "초5",
    "school": "갈산초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-PY-AL-1",
      "title": "파이썬알고리즘1",
      "level": "고급",
      "description": "파이썬 기초 문법을 기반으로 반복문, 리스트, 정렬, 최대공약수/최소공배수 등 알고리즘 기초를 훈련하며, Lv1 수준의 문제 해결력을 기르는 입문 알고리즘 코스입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "입/출력, 제어문",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "반복문1, 기본 알고리즘",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "반복문2, 파이썬 내장 함수, 리스트",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "반복문3, 이중반복문",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "반복문4, 2차원리스트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Lv1 Test1",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "정렬1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "정렬2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "최대공약수, 최소공배수",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "반복문5, 함수",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Lv1 Test2",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1067",
    "name": "남지호",
    "password": "9086",
    "age": "초5",
    "school": "우장초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-PY-AL-3",
      "title": "파이썬알고리즘3",
      "level": "고급",
      "description": "탐욕 알고리즘(Greedy), 그래프 탐색(DFS/BFS), 브루트포스 기법 등 중급 이상의 알고리즘 문제 해결 기초를 다지는 과정입니다. 실전 문제 해결을 위한 알고리즘 설계 역량을 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "그리디1",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "그리디2",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "그리디3",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "그리디4",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "그래프1",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "그래프2",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "그래프3",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "그래프4",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "그래프5",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "브루트포스",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Test",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "GPT 프리젠테이션",
        "title": "GPT 프리젠테이션 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "로블록스",
        "title": "로블록스 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM-PY-AL",
        "title": "DM-PY-AL (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AL-2",
        "title": "파이썬알고리즘2",
        "level": "고급",
        "description": "재귀함수와 deque, 동적계획법(DP), LIS, 이진 탐색, 투 포인터 등 중급 알고리즘 기법을 학습하는 과정입니다. 다양한 유형의 문제를 통해 실전 해결 능력을 키웁니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1070",
    "name": "안지엘",
    "password": "3411",
    "age": "중1",
    "school": "양정중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-PY-AL-3",
      "title": "파이썬알고리즘3",
      "level": "고급",
      "description": "탐욕 알고리즘(Greedy), 그래프 탐색(DFS/BFS), 브루트포스 기법 등 중급 이상의 알고리즘 문제 해결 기초를 다지는 과정입니다. 실전 문제 해결을 위한 알고리즘 설계 역량을 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "그리디1",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "그리디2",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "그리디3",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "그리디4",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "그래프1",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "그래프2",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "그래프3",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "그래프4",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "그래프5",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "브루트포스",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Test",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "파워포인트",
        "title": "파워포인트 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "마인크래프트",
        "title": "마인크래프트 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM-AL-C-1",
        "title": "DM-AL-C-1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AL-C-2",
        "title": "DM-AL-C-2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AL-C-3",
        "title": "DM-AL-C-3 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AL-2",
        "title": "파이썬알고리즘2",
        "level": "고급",
        "description": "재귀함수와 deque, 동적계획법(DP), LIS, 이진 탐색, 투 포인터 등 중급 알고리즘 기법을 학습하는 과정입니다. 다양한 유형의 문제를 통해 실전 해결 능력을 키웁니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1071",
    "name": "조영재",
    "password": "1802",
    "age": "중1",
    "school": "당산중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-AI-CAR-1",
      "title": "AI자율주행대회반",
      "level": "고급",
      "description": "YOLO, OpenCV, CNN 등의 AI 기술을 실제 주행 상황에 적용하며, 주행테스트를 넘어 실물 주행대회까지 경험합니다.",
      "progress": [
        {
          "week": 0,
          "topic": "주차 정보 없음",
          "status": "unavailable"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM202",
        "title": "아두이노 기본",
        "level": "중급",
        "description": "아두이노의 구조와 입출력 기초를 배우고, 센서와 액츄에이터를 활용한 프로젝트를 수행하는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1073",
    "name": "조윤재",
    "password": "6976",
    "age": "중1",
    "school": "월촌중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-AI-CAR-1",
      "title": "AI자율주행대회반",
      "level": "고급",
      "description": "YOLO, OpenCV, CNN 등의 AI 기술을 실제 주행 상황에 적용하며, 주행테스트를 넘어 실물 주행대회까지 경험합니다.",
      "progress": [
        {
          "week": 0,
          "topic": "주차 정보 없음",
          "status": "unavailable"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC101",
        "title": "DC101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM-PY-AI-1",
        "title": "DM-PY-AI-1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AI-2",
        "title": "DM-PY-AI-2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM202",
        "title": "아두이노 기본",
        "level": "중급",
        "description": "아두이노의 구조와 입출력 기초를 배우고, 센서와 액츄에이터를 활용한 프로젝트를 수행하는 입문 과정입니다."
      },
      {
        "id": "DM203",
        "title": "아두이노 메이킹",
        "level": "고급",
        "description": "센서와 모듈을 활용해 창작형 메이킹 프로젝트를 완성하는 아두이노 심화 과정입니다"
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1074",
    "name": "안제민",
    "password": "7047",
    "age": "중2",
    "school": "양정중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DC101",
        "title": "DC101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "로블록스",
        "title": "로블록스 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM-AL-C-1",
        "title": "DM-AL-C-1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AI-1",
        "title": "DM-PY-AI-1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AI-2",
        "title": "DM-PY-AI-2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AI-3",
        "title": "DM-PY-AI-3 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AI-CAR",
        "title": "DM-AI-CAR (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1075",
    "name": "윤호현",
    "password": "0508",
    "age": "고1",
    "school": "선린IT고",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-AI-CAR-1",
      "title": "AI자율주행대회반",
      "level": "고급",
      "description": "YOLO, OpenCV, CNN 등의 AI 기술을 실제 주행 상황에 적용하며, 주행테스트를 넘어 실물 주행대회까지 경험합니다.",
      "progress": [
        {
          "week": 0,
          "topic": "주차 정보 없음",
          "status": "unavailable"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM101",
        "title": "DM101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM-AL-C-1",
        "title": "DM-AL-C-1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AL-C-2",
        "title": "DM-AL-C-2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AL-C-0",
        "title": "DM-AL-C-0 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AL-C-2",
        "title": "DM-AL-C-2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AL-C-3",
        "title": "DM-AL-C-3 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AL-C-4",
        "title": "DM-AL-C-4 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-AI-CAR",
        "title": "DM-AI-CAR (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1076",
    "name": "김재영",
    "password": "3073",
    "age": "초6",
    "school": "당서초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM203",
      "title": "아두이노 메이킹",
      "level": "고급",
      "description": "센서와 모듈을 활용해 창작형 메이킹 프로젝트를 완성하는 아두이노 심화 과정입니다",
      "progress": [
        {
          "week": 1,
          "topic": "블루투스 모듈(HC-06) 세팅 및 음성 제어",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "서보모터 앱 제어",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "LED 무드등 프로젝트 (1)",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "LED 무드등 프로젝트 (2)",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "LED 무드등 프로젝트 (3)",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "미세먼지 알림장치 (1)",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "미세먼지 알림장치 (2)",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "블루투스 RC카 만들기 (1)",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "블루투스 RC카 만들기 (2)",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "블루투스 RC카 만들기 (3)",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "아두이노로 공모전 나가보기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM202",
        "title": "아두이노 기본",
        "level": "중급",
        "description": "아두이노의 구조와 입출력 기초를 배우고, 센서와 액츄에이터를 활용한 프로젝트를 수행하는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1077",
    "name": "이상협",
    "password": "3779",
    "age": "초6",
    "school": "신목초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-PY-AL-3",
      "title": "파이썬알고리즘3",
      "level": "고급",
      "description": "탐욕 알고리즘(Greedy), 그래프 탐색(DFS/BFS), 브루트포스 기법 등 중급 이상의 알고리즘 문제 해결 기초를 다지는 과정입니다. 실전 문제 해결을 위한 알고리즘 설계 역량을 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "그리디1",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "그리디2",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "그리디3",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "그리디4",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "그래프1",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "그래프2",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "그래프3",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "그래프4",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "그래프5",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "브루트포스",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Test",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "마인크래프트",
        "title": "마인크래프트 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM-WEB-1",
        "title": "DM-WEB-1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-WEB-2",
        "title": "DM-WEB-2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AL",
        "title": "DM-PY-AL (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AL-2",
        "title": "파이썬알고리즘2",
        "level": "고급",
        "description": "재귀함수와 deque, 동적계획법(DP), LIS, 이진 탐색, 투 포인터 등 중급 알고리즘 기법을 학습하는 과정입니다. 다양한 유형의 문제를 통해 실전 해결 능력을 키웁니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1078",
    "name": "나제이",
    "password": "5216",
    "age": "초5",
    "school": "목운초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DM-PY-AL-1",
      "title": "파이썬알고리즘1",
      "level": "고급",
      "description": "파이썬 기초 문법을 기반으로 반복문, 리스트, 정렬, 최대공약수/최소공배수 등 알고리즘 기초를 훈련하며, Lv1 수준의 문제 해결력을 기르는 입문 알고리즘 코스입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "입/출력, 제어문",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "반복문1, 기본 알고리즘",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "반복문2, 파이썬 내장 함수, 리스트",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "반복문3, 이중반복문",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "반복문4, 2차원리스트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Lv1 Test1",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "정렬1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "정렬2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "최대공약수, 최소공배수",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "반복문5, 함수",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Lv1 Test2",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS201",
        "title": "DS201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1079",
    "name": "엄예준",
    "password": "3605",
    "age": "연령 미입력",
    "school": "목원초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM104",
      "title": "파이게임",
      "level": "중급",
      "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이게임 들어가기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "파이게임의 이벤트",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "Rect 객체",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "Super Mario",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "Jump 기능",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Shooting 기능",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "Break Out 1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "Break Out 2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "Space Shooter 1",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "Space Shooter 2",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "게임 확장하기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1080",
    "name": "김세윤",
    "password": "3406",
    "age": "초2",
    "school": "목운초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DR_REGO_1",
        "title": "DR_REGO_1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_2",
        "title": "DR_REGO_2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_3",
        "title": "DR_REGO_3 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_4",
        "title": "DR_REGO_4 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_5",
        "title": "DR_REGO_5 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1083",
    "name": "정시우B",
    "password": "3767",
    "age": "초4",
    "school": "대영초등학교",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM104",
      "title": "파이게임",
      "level": "중급",
      "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이게임 들어가기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "파이게임의 이벤트",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "Rect 객체",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "Super Mario",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "Jump 기능",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Shooting 기능",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "Break Out 1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "Break Out 2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "Space Shooter 1",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "Space Shooter 2",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "게임 확장하기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1084",
    "name": "송혜리",
    "password": "0762",
    "age": "초5",
    "school": "유석초",
    "photoUrl": "/media/student_photos/010-3555-0762_tDyMTwk.png",
    "currentCourse": {
      "id": "DM-PY-AL-1",
      "title": "파이썬알고리즘1",
      "level": "고급",
      "description": "파이썬 기초 문법을 기반으로 반복문, 리스트, 정렬, 최대공약수/최소공배수 등 알고리즘 기초를 훈련하며, Lv1 수준의 문제 해결력을 기르는 입문 알고리즘 코스입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "입/출력, 제어문",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "반복문1, 기본 알고리즘",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "반복문2, 파이썬 내장 함수, 리스트",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "반복문3, 이중반복문",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "반복문4, 2차원리스트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Lv1 Test1",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "정렬1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "정렬2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "최대공약수, 최소공배수",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "반복문5, 함수",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Lv1 Test2",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1085",
    "name": "신민재",
    "password": "0476",
    "age": "중2",
    "school": "목동중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-AI-CAR-1",
      "title": "AI자율주행대회반",
      "level": "고급",
      "description": "YOLO, OpenCV, CNN 등의 AI 기술을 실제 주행 상황에 적용하며, 주행테스트를 넘어 실물 주행대회까지 경험합니다.",
      "progress": [
        {
          "week": 0,
          "topic": "주차 정보 없음",
          "status": "unavailable"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM-PY-AI-1",
        "title": "DM-PY-AI-1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-교과세특",
        "title": "DM-교과세특 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1087",
    "name": "임서진",
    "password": "5257",
    "age": "중2",
    "school": "경기글로벌스쿨",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DC_RX_01",
        "title": "로블록스기본",
        "level": "초급",
        "description": "로블록스를 활용한 3D 메타버스 콘텐츠 제작과 Lua 기반 스크립트 코딩의 기초를 배웁니다. 장애물 게임 만들기부터 인터랙션, 인터페이스 구현, 게임 출시에 이르기까지 실습 중심의 학습을 통해 창의력과 논리력을 함께 키울 수 있는 과정입니다."
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "파이썬인텐시브 1/3-1/12",
        "title": "파이썬인텐시브 1/3-1/12 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      },
      {
        "id": "DM-PY-AL",
        "title": "DM-PY-AL (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1088",
    "name": "임동현",
    "password": "2292",
    "age": "연령 미입력",
    "school": "목동중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-PY-AL-3",
      "title": "파이썬알고리즘3",
      "level": "고급",
      "description": "탐욕 알고리즘(Greedy), 그래프 탐색(DFS/BFS), 브루트포스 기법 등 중급 이상의 알고리즘 문제 해결 기초를 다지는 과정입니다. 실전 문제 해결을 위한 알고리즘 설계 역량을 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "그리디1",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "그리디2",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "그리디3",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "그리디4",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "그래프1",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "그래프2",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "그래프3",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "그래프4",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "그래프5",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "브루트포스",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Test",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM-PY-AL",
        "title": "DM-PY-AL (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AL-2",
        "title": "파이썬알고리즘2",
        "level": "고급",
        "description": "재귀함수와 deque, 동적계획법(DP), LIS, 이진 탐색, 투 포인터 등 중급 알고리즘 기법을 학습하는 과정입니다. 다양한 유형의 문제를 통해 실전 해결 능력을 키웁니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1089",
    "name": "유주원",
    "password": "6370",
    "age": "연령 미입력",
    "school": "목운초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DC301",
      "title": "마인크래프트파이썬",
      "level": "초급",
      "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "환경설정 및 마인크래프트 파이썬 소개",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "기본 자료형 (숫자, 문자열 등)",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "연산자와 복합 대입 연산자",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "문자열 함수와 형 변환",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "비교/논리 연산자와 불리언(Boolean) 자료형",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "함수 기초",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "함수 실전 활용",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "리스트 기초",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "반복문 for",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC_RX_01",
        "title": "로블록스기본",
        "level": "초급",
        "description": "로블록스를 활용한 3D 메타버스 콘텐츠 제작과 Lua 기반 스크립트 코딩의 기초를 배웁니다. 장애물 게임 만들기부터 인터랙션, 인터페이스 구현, 게임 출시에 이르기까지 실습 중심의 학습을 통해 창의력과 논리력을 함께 키울 수 있는 과정입니다."
      },
      {
        "id": "DC_RX_02",
        "title": "로블록스메이커",
        "level": "중급",
        "description": "로블록스 메이커 과정은 Lua 스크립트를 본격적으로 활용하여 게임 개발 능력을 심화시키는 과정입니다"
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1090",
    "name": "장우주",
    "password": "0930",
    "age": "초6",
    "school": "체드윅",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-AI-CAR-1",
      "title": "AI자율주행대회반",
      "level": "고급",
      "description": "YOLO, OpenCV, CNN 등의 AI 기술을 실제 주행 상황에 적용하며, 주행테스트를 넘어 실물 주행대회까지 경험합니다.",
      "progress": [
        {
          "week": 0,
          "topic": "주차 정보 없음",
          "status": "unavailable"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS103",
        "title": "AI코디니",
        "level": "초급",
        "description": "AI코디니 과정으로 학생코딩경진대회 준비하는 수업과정"
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DC_RX_01",
        "title": "로블록스기본",
        "level": "초급",
        "description": "로블록스를 활용한 3D 메타버스 콘텐츠 제작과 Lua 기반 스크립트 코딩의 기초를 배웁니다. 장애물 게임 만들기부터 인터랙션, 인터페이스 구현, 게임 출시에 이르기까지 실습 중심의 학습을 통해 창의력과 논리력을 함께 키울 수 있는 과정입니다."
      },
      {
        "id": "DC_RX_02",
        "title": "로블록스메이커",
        "level": "중급",
        "description": "로블록스 메이커 과정은 Lua 스크립트를 본격적으로 활용하여 게임 개발 능력을 심화시키는 과정입니다"
      },
      {
        "id": "DM-AI-CAR",
        "title": "DM-AI-CAR (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1091",
    "name": "오선우",
    "password": "1602",
    "age": "연령 미입력",
    "school": "목동초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DR_REGO_1",
        "title": "DR_REGO_1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_1",
        "title": "DR_REGO_1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_2",
        "title": "DR_REGO_2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_3",
        "title": "DR_REGO_3 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1093",
    "name": "유영준",
    "password": "8582",
    "age": "연령 미입력",
    "school": "목동초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DR_REGO_1",
        "title": "DR_REGO_1 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_2",
        "title": "DR_REGO_2 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DR_REGO_3",
        "title": "DR_REGO_3 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1094",
    "name": "신가윤",
    "password": "9217",
    "age": "연령 미입력",
    "school": "목운초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DM-PY-AL-1",
      "title": "파이썬알고리즘1",
      "level": "고급",
      "description": "파이썬 기초 문법을 기반으로 반복문, 리스트, 정렬, 최대공약수/최소공배수 등 알고리즘 기초를 훈련하며, Lv1 수준의 문제 해결력을 기르는 입문 알고리즘 코스입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "입/출력, 제어문",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "반복문1, 기본 알고리즘",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "반복문2, 파이썬 내장 함수, 리스트",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "반복문3, 이중반복문",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "반복문4, 2차원리스트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Lv1 Test1",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "정렬1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "정렬2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "최대공약수, 최소공배수",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "반복문5, 함수",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Lv1 Test2",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1095",
    "name": "서연우",
    "password": "6060",
    "age": "연령 미입력",
    "school": "목동초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-PY-AL-2",
      "title": "파이썬알고리즘2",
      "level": "고급",
      "description": "재귀함수와 deque, 동적계획법(DP), LIS, 이진 탐색, 투 포인터 등 중급 알고리즘 기법을 학습하는 과정입니다. 다양한 유형의 문제를 통해 실전 해결 능력을 키웁니다.",
      "progress": [
        {
          "week": 1,
          "topic": "시공간 복잡도, 재귀함수",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "deque1",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "deque2",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "DP1",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "DP2",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "DP3",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "DP4",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "LIS",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "이진 탐색",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "슬라이딩 윈도우, 투 포인터",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Test",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      },
      {
        "id": "DM-PY-AL-1",
        "title": "파이썬알고리즘1",
        "level": "고급",
        "description": "파이썬 기초 문법을 기반으로 반복문, 리스트, 정렬, 최대공약수/최소공배수 등 알고리즘 기초를 훈련하며, Lv1 수준의 문제 해결력을 기르는 입문 알고리즘 코스입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1097",
    "name": "이우열",
    "password": "9583",
    "age": "연령 미입력",
    "school": "갈산초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DC101",
        "title": "DC101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-MB-1",
        "title": "DM-MB-1 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1098",
    "name": "김도은",
    "password": "6287",
    "age": "연령 미입력",
    "school": "미동초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DM104",
      "title": "파이게임",
      "level": "중급",
      "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이게임 들어가기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "파이게임의 이벤트",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "Rect 객체",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "Super Mario",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "Jump 기능",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Shooting 기능",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "Break Out 1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "Break Out 2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "Space Shooter 1",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "Space Shooter 2",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "게임 확장하기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1099",
    "name": "옥지호",
    "password": "7619",
    "age": "연령 미입력",
    "school": "신길초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DM104",
      "title": "파이게임",
      "level": "중급",
      "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이게임 들어가기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "파이게임의 이벤트",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "Rect 객체",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "Super Mario",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "Jump 기능",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Shooting 기능",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "Break Out 1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "Break Out 2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "Space Shooter 1",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "Space Shooter 2",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "게임 확장하기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1100",
    "name": "신희재",
    "password": "4299",
    "age": "연령 미입력",
    "school": "양화중중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-2",
      "title": "파이썬심화",
      "level": "중급",
      "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "터틀 그래픽 시작하기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "함수 기초 ①",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "함수 기초 ②",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "함수 기초 ③",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "로봇 그리기 프로젝트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "수수께끼 게임 만들기",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "사자성어 게임",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "계산기 앱 만들기",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "사과 먹기 게임",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "매치 메이커 프로젝트",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Final 미션 (종합 프로젝트)",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1101",
    "name": "양우재",
    "password": "9131",
    "age": "연령 미입력",
    "school": "경인초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DC301",
      "title": "마인크래프트파이썬",
      "level": "초급",
      "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "환경설정 및 마인크래프트 파이썬 소개",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "기본 자료형 (숫자, 문자열 등)",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "연산자와 복합 대입 연산자",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "문자열 함수와 형 변환",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "비교/논리 연산자와 불리언(Boolean) 자료형",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "함수 기초",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "함수 실전 활용",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "리스트 기초",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "반복문 for",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1102",
    "name": "임수현",
    "password": "5471",
    "age": "초4",
    "school": "윤중초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC_RX_01",
        "title": "로블록스기본",
        "level": "초급",
        "description": "로블록스를 활용한 3D 메타버스 콘텐츠 제작과 Lua 기반 스크립트 코딩의 기초를 배웁니다. 장애물 게임 만들기부터 인터랙션, 인터페이스 구현, 게임 출시에 이르기까지 실습 중심의 학습을 통해 창의력과 논리력을 함께 키울 수 있는 과정입니다."
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1103",
    "name": "차혜원",
    "password": "5881",
    "age": "연령 미입력",
    "school": "강서초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DC301",
      "title": "마인크래프트파이썬",
      "level": "초급",
      "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "환경설정 및 마인크래프트 파이썬 소개",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "기본 자료형 (숫자, 문자열 등)",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "연산자와 복합 대입 연산자",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "문자열 함수와 형 변환",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "비교/논리 연산자와 불리언(Boolean) 자료형",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "함수 기초",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "함수 실전 활용",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "리스트 기초",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "반복문 for",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1104",
    "name": "최라윤",
    "password": "3184",
    "age": "연령 미입력",
    "school": "양화초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DM104",
      "title": "파이게임",
      "level": "중급",
      "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이게임 들어가기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "파이게임의 이벤트",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "Rect 객체",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "Super Mario",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "Jump 기능",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "Shooting 기능",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "Break Out 1",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "Break Out 2",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "Space Shooter 1",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "Space Shooter 2",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "게임 확장하기",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-2",
        "title": "파이썬심화",
        "level": "중급",
        "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1105",
    "name": "이채아",
    "password": "8910",
    "age": "연령 미입력",
    "school": "목운초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DC301",
      "title": "마인크래프트파이썬",
      "level": "초급",
      "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "환경설정 및 마인크래프트 파이썬 소개",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "기본 자료형 (숫자, 문자열 등)",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "연산자와 복합 대입 연산자",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "문자열 함수와 형 변환",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "비교/논리 연산자와 불리언(Boolean) 자료형",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "함수 기초",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "함수 실전 활용",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "리스트 기초",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "반복문 for",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1106",
    "name": "안도윤",
    "password": "7748",
    "age": "연령 미입력",
    "school": "목운초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1107",
    "name": "이환희",
    "password": "7683",
    "age": "연령 미입력",
    "school": "여의도중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-2",
      "title": "파이썬심화",
      "level": "중급",
      "description": "함수와 반복을 활용하여 다양한 미니 프로젝트를 완성하며 프로그래밍 사고력을 기르는 Python 심화 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "터틀 그래픽 시작하기",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "함수 기초 ①",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "함수 기초 ②",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "함수 기초 ③",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "로봇 그리기 프로젝트",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "수수께끼 게임 만들기",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "사자성어 게임",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "계산기 앱 만들기",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "사과 먹기 게임",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "매치 메이커 프로젝트",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Final 미션 (종합 프로젝트)",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103-1",
        "title": "파이썬기본",
        "level": "중급",
        "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1108",
    "name": "박서정",
    "password": "7372",
    "age": "연령 미입력",
    "school": "염동초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "DC301",
      "title": "마인크래프트파이썬",
      "level": "초급",
      "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "환경설정 및 마인크래프트 파이썬 소개",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "기본 자료형 (숫자, 문자열 등)",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "연산자와 복합 대입 연산자",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "문자열 함수와 형 변환",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "비교/논리 연산자와 불리언(Boolean) 자료형",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "함수 기초",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "함수 실전 활용",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "리스트 기초",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "반복문 for",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1110",
    "name": "신현진",
    "password": "7290",
    "age": "중2",
    "school": "목동중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-AI-CAR-1",
      "title": "AI자율주행대회반",
      "level": "고급",
      "description": "YOLO, OpenCV, CNN 등의 AI 기술을 실제 주행 상황에 적용하며, 주행테스트를 넘어 실물 주행대회까지 경험합니다.",
      "progress": [
        {
          "week": 0,
          "topic": "주차 정보 없음",
          "status": "unavailable"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "파이썬 인텐시브",
        "title": "파이썬 인텐시브 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DM-PY-AL-1",
        "title": "파이썬알고리즘1",
        "level": "고급",
        "description": "파이썬 기초 문법을 기반으로 반복문, 리스트, 정렬, 최대공약수/최소공배수 등 알고리즘 기초를 훈련하며, Lv1 수준의 문제 해결력을 기르는 입문 알고리즘 코스입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1112",
    "name": "손예성",
    "password": "1237",
    "age": "중1",
    "school": "구일중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1113",
    "name": "최민준",
    "password": "6206",
    "age": "연령 미입력",
    "school": "서정초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DC101",
        "title": "DC101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS-MB-1",
        "title": "DS-MB-1 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1114",
    "name": "이규헌",
    "password": "3688",
    "age": "초6",
    "school": "경인초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1115",
    "name": "한승우",
    "password": "2507",
    "age": "초3",
    "school": "염창초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DS-MB-1",
        "title": "DS-MB-1 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1117",
    "name": "김도윤",
    "password": "2658",
    "age": "초5",
    "school": "안현초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1118",
    "name": "조성훈",
    "password": "9685",
    "age": "초4",
    "school": "성원초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1119",
    "name": "박민우",
    "password": "4849",
    "age": "중3",
    "school": "신서중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "파이썬 트랙",
        "title": "파이썬 트랙 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1120",
    "name": "유재윤",
    "password": "9952",
    "age": "연령 미입력",
    "school": "목동중",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DC-3D",
      "title": "3D모델링",
      "level": "중급",
      "description": "3D 모델링의 기본 개념부터 실제 모델 제작까지 배우는 실습 중심의 과정입니다.  \nTinkerCAD  도구를 활용하여 창의적인 아이디어를 3차원으로 구현하며,  \n디지털 제작 역량과 공간 사고력을 함께 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "기본 도형을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "포물선을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "패턴을 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "3D 프린팅 개념과 실습",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "지지대를 활용한 3D 모델링",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "치수를 고려한 실용 모델 제작",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "다양한 모양의 3D 모델 구현",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "기어 구조물 모델링과 설계",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "나만의 창작 프로젝트 설계",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "3D 모델링 출력 실습 및 보정",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "최종 발표 및 작품 피드백",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM201",
        "title": "C언어기초",
        "level": "중급",
        "description": "컴퓨터 프로그래밍의 근간이 되는 C언어를 배우며, 기초 문법과 제어문, 함수, 배열 등 핵심 개념을 익히는 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1121",
    "name": "이주호",
    "password": "3243",
    "age": "연령 미입력",
    "school": "목운초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DC102",
        "title": "DC102 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1122",
    "name": "김단희",
    "password": "2724",
    "age": "초4",
    "school": "갈산초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1124",
    "name": "배재민",
    "password": "0817",
    "age": "초6",
    "school": "보라매초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM-PY-AL-3",
      "title": "파이썬알고리즘3",
      "level": "고급",
      "description": "탐욕 알고리즘(Greedy), 그래프 탐색(DFS/BFS), 브루트포스 기법 등 중급 이상의 알고리즘 문제 해결 기초를 다지는 과정입니다. 실전 문제 해결을 위한 알고리즘 설계 역량을 기릅니다.",
      "progress": [
        {
          "week": 1,
          "topic": "그리디1",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "그리디2",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "그리디3",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "그리디4",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "그래프1",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "그래프2",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "그래프3",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "그래프4",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "그래프5",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "브루트포스",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "Test",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [
      {
        "id": "DM-PY-AL-2",
        "title": "파이썬알고리즘2",
        "level": "고급",
        "description": "재귀함수와 deque, 동적계획법(DP), LIS, 이진 탐색, 투 포인터 등 중급 알고리즘 기법을 학습하는 과정입니다. 다양한 유형의 문제를 통해 실전 해결 능력을 키웁니다."
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1125",
    "name": "함지안",
    "password": "5500",
    "age": "초3",
    "school": "경인초",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "드론대회 준비반",
        "title": "드론대회 준비반 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1330",
    "name": "장우진",
    "password": "8235",
    "age": "중2",
    "school": "SFS",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DS101",
        "title": "DS101 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS102",
        "title": "DS102 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DS103",
        "title": "AI코디니",
        "level": "초급",
        "description": "AI코디니 과정으로 학생코딩경진대회 준비하는 수업과정"
      },
      {
        "id": "DS202",
        "title": "DS202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC201",
        "title": "DC201 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC202",
        "title": "DC202 (미등록 과목)",
        "level": "",
        "description": ""
      },
      {
        "id": "DC301",
        "title": "마인크래프트파이썬",
        "level": "초급",
        "description": "마인크래프트 파이썬 환경을 통해 기본 문법부터 함수, 조건문, 반복문까지 실습하며 파이썬 프로그래밍의 핵심을 게임 속에서 재미있게 익히는 입문 과정입니다."
      },
      {
        "id": "DM103",
        "title": "파이썬기초",
        "level": "중급",
        "description": "프로그래밍의 기초 개념부터 Python 문법, 제어문, 함수, 그리고 간단한 Turtle 그래픽까지 실습을 통해 익히며 컴퓨팅 사고력을 기릅니다."
      },
      {
        "id": "DM104",
        "title": "파이게임",
        "level": "중급",
        "description": "파이게임(Pygame)을 통해 게임 개발의 기초를 배우고, 점프, 슈팅, 충돌 등의 기능을 직접 구현하며 창의적 게임을 만들어보는 프로젝트 기반 과정입니다."
      },
      {
        "id": "DC_RX_02",
        "title": "로블록스메이커",
        "level": "중급",
        "description": "로블록스 메이커 과정은 Lua 스크립트를 본격적으로 활용하여 게임 개발 능력을 심화시키는 과정입니다"
      },
      {
        "id": "DM_AI_CAR",
        "title": "DM_AI_CAR (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 100,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1811",
    "name": "이주형",
    "password": "7965",
    "age": "초2",
    "school": "목동초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [
      {
        "id": "DR_REGO_1",
        "title": "DR_REGO_1 (미등록 과목)",
        "level": "",
        "description": ""
      }
    ],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1812",
    "name": "이시안",
    "password": "1793",
    "age": "연령 미입력",
    "school": "YISS",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1813",
    "name": "서지후",
    "password": "6188",
    "age": "초5",
    "school": "신미림초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1814",
    "name": "이세인",
    "password": "5389",
    "age": "연령 미입력",
    "school": "",
    "photoUrl": "/public/images/profile-default-girl.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1815",
    "name": "이선우",
    "password": "5389",
    "age": "연령 미입력",
    "school": "",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1816",
    "name": "서정원",
    "password": "8090",
    "age": "연령 미입력",
    "school": "월촌초",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "DM103-1",
      "title": "파이썬기본",
      "level": "중급",
      "description": "변수, 조건문, 반복문 등 Python의 기본 문법을 실습 중심으로 익히는 입문 과정입니다.",
      "progress": [
        {
          "week": 1,
          "topic": "파이썬 시작하기 - Welcome to Python",
          "status": "pending"
        },
        {
          "week": 2,
          "topic": "변수 이해하기",
          "status": "pending"
        },
        {
          "week": 3,
          "topic": "순서 있는 데이터 - 문자열",
          "status": "pending"
        },
        {
          "week": 4,
          "topic": "순서 있는 데이터 - 리스트",
          "status": "pending"
        },
        {
          "week": 5,
          "topic": "리스트와 사용자 입력",
          "status": "pending"
        },
        {
          "week": 6,
          "topic": "조건문 if",
          "status": "pending"
        },
        {
          "week": 7,
          "topic": "조건에 따른 반복문 while",
          "status": "pending"
        },
        {
          "week": 8,
          "topic": "랜덤 모듈과 무한 반복",
          "status": "pending"
        },
        {
          "week": 9,
          "topic": "자료형과 딕셔너리",
          "status": "pending"
        },
        {
          "week": 10,
          "topic": "데이터에 따른 반복문 for",
          "status": "pending"
        },
        {
          "week": 11,
          "topic": "마무리 프로젝트",
          "status": "pending"
        }
      ]
    },
    "courseHistory": [],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  },
  {
    "id": "student-1817",
    "name": "김이래",
    "password": "2591",
    "age": "연령 미입력",
    "school": "외국학교",
    "photoUrl": "/public/images/profile-default-boy.png",
    "currentCourse": {
      "id": "",
      "title": "수강 중인 과정 없음",
      "level": "",
      "description": "",
      "progress": []
    },
    "courseHistory": [],
    "skills": [
      {
        "subject": "코딩기초",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "알고리즘",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "게임개발",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "AI",
        "score": 20,
        "fullMark": 100
      },
      {
        "subject": "로봇",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "하드웨어",
        "score": 0,
        "fullMark": 100
      },
      {
        "subject": "웹",
        "score": 40,
        "fullMark": 100
      }
    ],
    "recommendations": {
      "nextCourse": {
        "title": "다음 추천 과정",
        "description": "추천 과정을 수동으로 채워주세요."
      },
      "certificates": [],
      "competitions": []
    },
    "feedbacks": [],
    "achievements": []
  }
];

export const announcementsData: Announcement[] = [
  {
    "id": "announce-1",
    "title": "여름 휴무 안내 (7/29~8/2)",
    "content": "        \"디랩 목동캠퍼스는 여름방학 기간 중 다음과 같이 휴무합니다.\"\n        \"■ 휴무 기간: 2024년 7월 29일(월) ~ 8월 2일(금)\"\n        \"■ 대상: 전 과정 수업 및 상담 업무\"\n        \"문의 사항은 카카오채널로 남겨주시면 순차적으로 답변드리겠습니다.\"\n        \"무더운 여름 건강히 보내시고, 다시 뵙는 날까지 좋은 하루 되세요 :)\"",
    "date": "2025-07-07"
  }
];