# D-LAB Smart Attendance System V3

목동 코딩 학원 '디랩'의 출결 관리 시스템 웹 애플리케이션입니다.

## ✨ V3 주요 기능

### 🔐 인증 및 보안 (NEW!)
- **Supabase Authentication** 통합
- **관리자 로그인 시스템** (`/login`)
- **스태프 관리** - 관리자 계정 추가/삭제
- **Row Level Security (RLS)** - 데이터베이스 보안
- **역할 기반 접근 제어** (마스터 관리자 / 스태프)

### 📱 키오스크 모드 (학생용)
- 전화번호 뒷자리 4자리 입력
- 중복 학생 처리 (선택 모달)
- 시간표 기반 자동 출결 체크
- 성공 화면 + 수업 정보 표시
- 마케팅 배너

### 💼 관리자 대시보드
- 실시간 출결 현황
- 시간표 그리드 뷰 (교실별 × 시간대별)
- 수강생 관리
- 알림 설정 (알림톡/SMS)
- **스태프 관리** (관리자 전용)

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup

#### 2.1 환경 변수 설정
```bash
cp env.example .env.local
```

`.env.local` 파일 수정:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 2.2 데이터베이스 스키마 적용
1. Supabase Dashboard → SQL Editor
2. `SUPABASE_SCHEMA.sql` 파일 내용 복사 & 실행

#### 2.3 마스터 관리자 계정 생성
자세한 내용은 `SETUP_AUTH.md` 파일을 참조하세요.

**간단 요약:**
1. Supabase Dashboard → Authentication → Users → "Add user"
2. Email: `admin@dlab.com`, Password: `pass1234`
3. Auto Confirm User 체크
4. `CREATE_MASTER_ADMIN.sql` 스크립트 실행

### 3. Run Development Server
```bash
npm run dev
```

## 📍 Routes

### 공개 페이지
- `/` - 키오스크 (학생용)
- `/login` - 관리자 로그인

### 보호된 페이지 (인증 필요)
- `/admin` - 대시보드
- `/admin/schedule` - 시간표
- `/admin/students` - 수강생 관리
- `/admin/settings` - 설정
- `/admin/settings/staff` - 스태프 관리 (관리자 전용)

## 🔒 Security Features

### Row Level Security (RLS)
- ✅ Students, Classes, Enrollments: 인증된 사용자만 접근
- ✅ Attendance Logs: 키오스크 삽입 허용, 조회는 인증 필요
- ✅ Profiles: 관리자만 생성/수정/삭제 가능

### 역할 시스템
- **Master Admin (마스터 관리자)**: 모든 권한 + 스태프 관리
- **Staff (스태프)**: 데이터 조회/수정 권한

## 🎨 UI/UX Features

- **한국어 완전 지원** (All text in Korean)
- **D-LAB 브랜드 컬러** (Blue: #1E40AF, Purple: #7C3AED)
- **반응형 디자인**
- **그라디언트 & 애니메이션**
- **프리미엄 디자인**

## 📚 Documentation

- `SETUP_AUTH.md` - 인증 시스템 설정 가이드
- `SUPABASE_SCHEMA.sql` - 데이터베이스 스키마
- `CREATE_MASTER_ADMIN.sql` - 마스터 계정 생성 스크립트

## 🧪 Test Credentials

### 관리자 로그인
- Email: `admin@dlab.com`
- Password: `pass1234`

### 키오스크 테스트 (전화번호 뒷자리)
- `3531` (Kim Rumi)
- `4453` (Hwang Siu)
- `3356` (Kim Si-eon)
- `0751` (Choi Min-ho)

## 📞 Support

문제가 발생하면 `SETUP_AUTH.md`의 "문제 해결" 섹션을 참조하세요.

---

**D-LAB 코딩 아카데미 목동점 전용 시스템**
