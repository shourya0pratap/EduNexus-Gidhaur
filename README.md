# EduNexus-Gidhaur

A production-oriented Next.js + Supabase foundation for a modular academic repository, dynamic examination management, attendance automation, assignments/resources, analytics, and report-card generation.

## Source of truth

The implementation follows the supplied EduNexus-Gidhaur specification: role-based access, Supabase/PostgreSQL, dynamic exams and grading, attendance, resources, assignments, report cards, public lookup, RLS, seed data, and an App Router architecture.

## Architecture

```text
app/
  (auth)/                 Authentication pages
  admin/                   Admin workspace
  teacher/                 Teacher workspace
  student/                Student workspace
  parent/                 Parent workspace
  report/                 Public report lookup
  api/                    Server-side API boundaries

components/
  ui/
  dashboard/
  attendance/
  exams/
  students/
  reports/
  resources/

lib/
  supabase/               Browser/server Supabase clients
  auth/                   Role/session helpers
  calculations/           Pure academic calculations
  validations/            Zod schemas
  pdf/                    Report-card generation boundary

types/                     Shared TypeScript types
hooks/                     Reusable client hooks
supabase/
  migrations/              PostgreSQL schema + RLS
  seed.sql                 Demonstration data
```

## Data model

Core entities:

- `profiles` -> authenticated identity + role
- `students`, `parents`, `teachers`
- `classes`, `sections`, `subjects`
- `teacher_classes`, `teacher_subjects`
- `student_enrollments`
- `exams`, `exam_subjects`, `marks`
- `attendance_sessions`, `attendance`
- `assignments`, `resources`, `submissions`
- `grade_scales`
- `report_cards`
- `school_settings`
- `public_lookup_attempts`

The schema intentionally keeps exam types and grading configurable instead of hard-coding school-specific patterns.

## Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor or with the Supabase CLI.
4. Create an auth user for the first administrator, then set the matching `profiles.role` to `admin`.
5. Run `supabase/seed.sql` after the base schema and after creating any demo auth users.
6. Install dependencies and start Next.js.

```bash
npm install
npm run dev
```

## Important security boundary

Never put `SUPABASE_SERVICE_ROLE_KEY` in client code. Public report lookup is deliberately exposed through a narrowly scoped PostgreSQL RPC (`lookup_public_student`) rather than exposing tables directly.

The current scaffold establishes the backend foundation. Feature pages and mutations should call server actions/API routes and enforce the same role rules as the database RLS. Public lookup rate limiting should be implemented at the edge/API layer before production deployment; the schema includes an audit table for that purpose.

## Build order

1. Schema + RLS
2. Auth/session + role routing
3. Admin shell
4. Student/class/subject management
5. Dynamic exams + grading
6. Marks entry/import
7. Attendance
8. Resources + assignments
9. Report-card PDF
10. Public lookup
11. Analytics
12. Seed/demo flow
13. End-to-end testing


## Current implementation pass

The repository now includes working foundations for:

- Responsive admin SaaS shell and navigation
- Supabase-authenticated role routing
- Admin dashboard metrics
- Student creation/search/deactivation
- Class listing and creation
- Teacher directory
- Dynamic examination creation
- Marks-entry interface with grade/pass calculations
- Attendance roster marking and persistence
- Resource and assignment views
- School settings editing
- Student and parent dashboard foundations
- Public roll-number + DOB report lookup API
- Report-card PDF document component
- PostgreSQL exam summary/calculation helpers

The remaining production hardening is deliberately isolated: teacher-specific mutations should use their exact assigned teacher identity rather than demo selectors, file uploads need Storage upload components and MIME/size enforcement, report-card generation needs its server-side query/action, and edge rate limiting should be enabled for the public lookup endpoint before production.
