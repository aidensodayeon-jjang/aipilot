# D-LAB Smart Attendance System V3

## Project Overview

This project is the D-LAB Smart Attendance System V3, a web application for managing attendance at the D-LAB coding academy. It features a kiosk mode for students to check in, an administrator dashboard for managing attendance, schedules, students, and staff, and robust authentication and security features.

**Key Features:**
- **Authentication & Security:** Supabase Authentication, Admin Login, Staff Management, Row Level Security (RLS), Role-Based Access Control (Master Admin / Staff).
- **Kiosk Mode:** Student check-in via phone number, automatic attendance based on timetable, success screen with class info, marketing banner.
- **Admin Dashboard:** Real-time attendance, timetable grid view, student management, notification settings, staff management.

## Tech Stack

-   **Framework:** Next.js 16 (App Router)
-   **Styling:** Tailwind CSS v4
-   **State Management:** Zustand
-   **Icons:** Lucide React
-   **Database:** Supabase (PostgreSQL)
-   **Authentication:** Supabase Auth

## Building and Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup

#### 2.1 Environment Variables
Copy `env.example` to `.env.local` and update with your Supabase project details:
```bash
cp env.example .env.local
```
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 2.2 Apply Database Schema
1. Go to Supabase Dashboard → SQL Editor.
2. Copy and execute the contents of `SUPABASE_SCHEMA.sql`.

#### 2.3 Create Master Admin Account
Refer to `SETUP_AUTH.md` for detailed instructions.
**Summary:**
1. Supabase Dashboard → Authentication → Users → "Add user".
2. Email: `admin@dlab.com`, Password: `pass1234`.
3. Check "Auto Confirm User".
4. Execute the `CREATE_MASTER_ADMIN.sql` script.

### 3. Run Development Server
```bash
npm run dev
```

## Development Conventions

-   **Styling:** Tailwind CSS v4 is used for styling.
-   **State Management:** Zustand is used for state management.
-   **Icons:** Lucide React provides the icons.
-   **Language:** The application is fully localized in Korean.

## Security Features

-   **Row Level Security (RLS):** Implemented for Students, Classes, Enrollments (authenticated users only), Attendance Logs (kiosk insertion, authenticated view), and Profiles (admin creation/modification/deletion).
-   **Role System:**
    -   **Master Admin:** Full permissions, including staff management.
    -   **Staff:** Data viewing and modification permissions.

## UI/UX Features

-   Full Korean language support.
-   Adherence to D-LAB brand colors (Blue: #1E40AF, Purple: #7C3AED).
-   Responsive design.
-   Gradient and animation effects.
-   Premium design aesthetic.

## Documentation

-   `SETUP_AUTH.md`: Authentication system setup guide.
-   `SUPABASE_SCHEMA.sql`: Database schema definition.
-   `CREATE_MASTER_ADMIN.sql`: Script for creating the master admin account.

## Test Credentials

### Admin Login
-   Email: `admin@dlab.com`
-   Password: `pass1234`

### Kiosk Test (Last 4 digits of phone number)
-   `3531` (Kim Rumi)
-   `4453` (Hwang Siu)
-   `3356` (Kim Si-eon)
-   `0751` (Choi Min-ho)
