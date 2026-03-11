# D-LAB 출결 시스템 V3 - 인증 및 보안 설정 가이드

## 🔐 주요 변경사항

### V3 업데이트 내용
1. **Supabase 인증 시스템 통합**
2. **관리자 로그인 페이지** (`/login`)
3. **스태프 관리 시스템** (`/admin/settings/staff`)
4. **Row Level Security (RLS)** 적용
5. **보호된 관리자 라우트**

---

## 📋 설정 단계

### 1. Supabase 프로젝트 설정

#### 1.1 환경 변수 설정
1. `env.example` 파일을 `.env.local`로 복사
2. Supabase 프로젝트 설정에서 다음 값을 가져오기:
   - Project URL
   - Anon (public) key

```bash
cp env.example .env.local
```

`.env.local` 파일 수정:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### 1.2 데이터베이스 스키마 적용

1. Supabase Dashboard → SQL Editor 열기
2. `SUPABASE_SCHEMA.sql` 파일의 내용을 복사하여 실행
3. 다음 테이블이 생성됩니다:
   - `students` (수강생)
   - `classes` (수업)
   - `enrollments` (수강 등록)
   - `attendance_logs` (출결 기록)
   - `profiles` (관리자/스태프 프로필)

#### 1.3 마스터 관리자 계정 생성

**방법 1: Supabase Dashboard 사용 (권장)**

1. Supabase Dashboard → Authentication → Users
2. "Add user" 클릭
3. 다음 정보 입력:
   - Email: `admin@dlab.com`
   - Password: `pass1234`
   - Auto Confirm User: ✅ 체크
4. 생성된 사용자의 UUID 복사

5. SQL Editor에서 프로필 생성:
```sql
INSERT INTO public.profiles (id, full_name, role)
VALUES ('복사한-UUID-여기에-붙여넣기', 'Master Admin', 'admin');
```

**방법 2: SQL로 직접 생성**

```sql
-- 1. Auth 사용자 생성 (Supabase Auth 함수 사용)
-- 주의: 이 방법은 Supabase의 auth.users 테이블에 직접 접근이 필요합니다.
-- Dashboard를 사용하는 것이 더 안전합니다.

-- 2. 생성된 사용자 ID 확인
SELECT id, email FROM auth.users WHERE email = 'admin@dlab.com';

-- 3. 프로필 생성
INSERT INTO public.profiles (id, full_name, role)
VALUES ('위에서-확인한-UUID', 'Master Admin', 'admin');
```

---

## 🔒 보안 정책 (RLS)

### 적용된 보안 규칙

#### Students, Classes, Enrollments
- ✅ **SELECT**: 인증된 사용자만 조회 가능
- ✅ **INSERT/UPDATE/DELETE**: 인증된 사용자만 가능

#### Attendance Logs
- ✅ **INSERT**: 누구나 가능 (키오스크 공개 접근용)
- ✅ **SELECT/UPDATE/DELETE**: 인증된 사용자만 가능

#### Profiles
- ✅ **SELECT**: 인증된 사용자만 조회 가능
- ✅ **INSERT/UPDATE/DELETE**: 관리자(admin)만 가능

---

## 🚀 사용 방법

### 로그인
1. 브라우저에서 `/login` 접속
2. 마스터 계정으로 로그인:
   - 이메일: `admin@dlab.com`
   - 비밀번호: `pass1234`

### 스태프 추가
1. 로그인 후 `/admin/settings` 접속
2. "스태프 관리" 카드 클릭
3. "스태프 추가" 버튼 클릭
4. 정보 입력:
   - 이름
   - 이메일
   - 비밀번호 (최소 6자)
   - 역할 (스태프 또는 마스터 관리자)

### 스태프 삭제
1. 스태프 관리 페이지에서 삭제할 스태프의 휴지통 아이콘 클릭
2. 확인 후 삭제

---

## 🎨 페이지 구조

### 공개 페이지
- `/` - 키오스크 (학생용, 공개)
- `/login` - 관리자 로그인

### 보호된 페이지 (인증 필요)
- `/admin` - 대시보드
- `/admin/schedule` - 시간표
- `/admin/students` - 수강생 관리
- `/admin/settings` - 설정
- `/admin/settings/staff` - 스태프 관리 (관리자 전용)

---

## 🔧 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

---

## ⚠️ 주의사항

### 보안
1. **프로덕션 환경에서는 반드시 강력한 비밀번호 사용**
2. `.env.local` 파일은 절대 Git에 커밋하지 말 것
3. Supabase 프로젝트의 RLS가 활성화되어 있는지 확인

### 키오스크 모드
- 키오스크는 공개 접근이 가능하지만, 출결 기록만 삽입 가능
- 학생 개인정보는 전화번호 입력 시에만 조회 가능
- 관리자 페이지는 완전히 분리되어 보호됨

### 스태프 관리
- 마스터 관리자만 스태프를 추가/삭제할 수 있음
- 자기 자신의 계정은 삭제할 수 없음
- 스태프 역할은 읽기/쓰기 권한만 있고, 다른 스태프를 관리할 수 없음

---

## 📱 UI/UX 특징

### 로그인 페이지
- 깔끔한 D-LAB 브랜딩
- 그라디언트 디자인
- 에러 메시지 표시
- 로딩 상태 표시

### 관리자 대시보드
- 사용자 프로필 표시 (이름, 역할)
- 로그아웃 기능
- 보호된 라우트 자동 리다이렉트

### 스태프 관리
- 테이블 형식의 스태프 목록
- 역할별 배지 (관리자/스태프)
- 모달 형식의 추가 폼
- 실시간 성공/에러 메시지

---

## 🐛 문제 해결

### "인증 확인 중..." 무한 로딩
- `.env.local` 파일이 올바르게 설정되었는지 확인
- 개발 서버 재시작 (`npm run dev`)

### 로그인 실패
- Supabase Dashboard에서 사용자가 생성되었는지 확인
- 이메일 확인이 완료되었는지 확인 (Auto Confirm 체크)
- `profiles` 테이블에 해당 사용자의 프로필이 있는지 확인

### RLS 정책 오류
- Supabase Dashboard → Database → Policies에서 정책 확인
- `SUPABASE_SCHEMA.sql` 파일을 다시 실행

---

## 🧪 개발용 모의 모드 (Dev Mode)

Supabase 프로젝트를 아직 설정하지 않았더라도 UI 테스트를 할 수 있도록 **모의 로그인 모드**가 구현되어 있습니다.

1. `.env.local`에 플레이스홀더 값이 있어도 작동합니다.
2. 다음 계정으로 로그인 시도 시 자동으로 모의 모드로 전환됩니다:
   - **이메일**: `admin@dlab.com`
   - **비밀번호**: `pass1234`
3. 이 모드에서는 스태프 관리 페이지 등에서 가상의 데이터가 표시됩니다.
4. **주의**: 실제 데이터는 저장되지 않으며, 새로고침 시 초기화될 수 있습니다.

---

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Supabase 프로젝트 상태
2. 브라우저 콘솔 에러 메시지
3. Supabase Dashboard의 Logs

---

**D-LAB 코딩 아카데미 목동점 전용 시스템**
