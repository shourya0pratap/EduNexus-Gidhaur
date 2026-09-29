-- EduNexus-Gidhaur
-- Initial relational schema + RLS.
-- Run in a fresh Supabase project.

create extension if not exists pgcrypto;

create type public.user_role as enum ('admin','teacher','student','parent');
create type public.attendance_status as enum ('present','absent','late');
create type public.resource_type as enum ('pdf','note','homework','assignment','external_link','study_material');
create type public.submission_status as enum ('pending','submitted','late','graded');
create type public.exam_status as enum ('draft','published','closed');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role public.user_role not null default 'student',
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  academic_year text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(name, academic_year)
);

create table public.sections (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  name text not null,
  capacity integer check (capacity is null or capacity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(class_id, name)
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(name),
  unique(code)
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  full_name text not null,
  roll_number text not null,
  date_of_birth date not null,
  gender text,
  admission_number text unique,
  parent_name text,
  parent_phone text,
  email text,
  profile_photo_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index students_roll_idx on public.students(roll_number);
create index students_name_idx on public.students(lower(full_name));

create table public.parents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  full_name text not null,
  phone text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.parent_students (
  parent_id uuid not null references public.parents(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  relationship text,
  primary key(parent_id, student_id)
);

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  employee_code text unique,
  full_name text not null,
  phone text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.teacher_classes (
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  section_id uuid references public.sections(id) on delete cascade,
  is_primary boolean not null default false,
  primary key(teacher_id, class_id, section_id)
);

create table public.teacher_subjects (
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  primary key(teacher_id, subject_id)
);

create table public.student_enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete restrict,
  section_id uuid not null references public.sections(id) on delete restrict,
  academic_year text not null,
  roll_number text not null,
  enrolled_on date not null default current_date,
  is_current boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(student_id, academic_year),
  unique(section_id, roll_number, academic_year)
);

create index enrollment_class_section_idx
  on public.student_enrollments(class_id, section_id, academic_year);

create table public.grade_scales (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.grade_scale_ranges (
  id uuid primary key default gen_random_uuid(),
  grade_scale_id uuid not null references public.grade_scales(id) on delete cascade,
  grade text not null,
  min_percentage numeric(5,2) not null check(min_percentage >= 0 and min_percentage <= 100),
  max_percentage numeric(5,2) not null check(max_percentage >= 0 and max_percentage <= 100),
  unique(grade_scale_id, grade),
  check(max_percentage >= min_percentage)
);

create table public.exams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  exam_type text not null,
  class_id uuid not null references public.classes(id) on delete restrict,
  academic_year text not null,
  start_date date,
  end_date date,
  status public.exam_status not null default 'draft',
  grade_scale_id uuid references public.grade_scales(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index exams_class_year_idx on public.exams(class_id, academic_year);

create table public.exam_subjects (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  maximum_marks numeric(7,2) not null check(maximum_marks > 0),
  passing_marks numeric(7,2) not null check(passing_marks >= 0 and passing_marks <= maximum_marks),
  weightage numeric(6,3) not null default 100 check(weightage >= 0),
  exam_date date,
  unique(exam_id, subject_id)
);

create table public.marks (
  id uuid primary key default gen_random_uuid(),
  exam_subject_id uuid not null references public.exam_subjects(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  marks_obtained numeric(7,2) not null check(marks_obtained >= 0),
  grade text,
  status text check(status in ('pass','fail')),
  is_final boolean not null default false,
  entered_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(exam_subject_id, student_id)
);

create index marks_student_idx on public.marks(student_id);

create table public.attendance_sessions (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete restrict,
  section_id uuid not null references public.sections(id) on delete restrict,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  attendance_date date not null,
  teacher_id uuid not null references public.teachers(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(class_id, section_id, subject_id, attendance_date)
);

create index attendance_sessions_date_idx on public.attendance_sessions(attendance_date);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.attendance_sessions(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  status public.attendance_status not null,
  note text,
  marked_at timestamptz not null default now(),
  unique(session_id, student_id)
);

create index attendance_student_idx on public.attendance(student_id);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  class_id uuid not null references public.classes(id) on delete restrict,
  section_id uuid references public.sections(id) on delete set null,
  teacher_id uuid not null references public.teachers(id) on delete restrict,
  deadline timestamptz,
  attachment_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index assignments_scope_idx on public.assignments(class_id, section_id, subject_id, deadline);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  class_id uuid not null references public.classes(id) on delete restrict,
  section_id uuid references public.sections(id) on delete set null,
  subject_id uuid not null references public.subjects(id) on delete restrict,
  teacher_id uuid not null references public.teachers(id) on delete restrict,
  resource_type public.resource_type not null,
  file_path text,
  external_url text,
  upload_date timestamptz not null default now(),
  deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (file_path is not null and external_url is null)
    or (file_path is null and external_url is not null)
    or (file_path is null and external_url is null)
  )
);

create index resources_scope_idx on public.resources(class_id, section_id, subject_id, resource_type);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  submitted_at timestamptz,
  attachment_path text,
  status public.submission_status not null default 'pending',
  grade numeric(7,2),
  feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(assignment_id, student_id)
);

create table public.report_cards (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  exam_id uuid not null references public.exams(id) on delete cascade,
  total_marks numeric(10,2) not null default 0,
  maximum_marks numeric(10,2) not null default 0,
  overall_percentage numeric(6,2) not null default 0,
  overall_grade text,
  overall_status text check(overall_status in ('pass','fail')),
  attendance_percentage numeric(6,2),
  teacher_remarks text,
  principal_remarks text,
  generated_at timestamptz,
  generated_by uuid references public.profiles(id) on delete set null,
  pdf_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(student_id, exam_id)
);

create table public.school_settings (
  id uuid primary key default gen_random_uuid(),
  school_name text not null default 'Gidhaur Central School',
  logo_path text,
  address text,
  phone text,
  email text,
  website text,
  principal_name text,
  attendance_threshold numeric(5,2) not null default 75
    check(attendance_threshold >= 0 and attendance_threshold <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.public_lookup_attempts (
  id bigint generated always as identity primary key,
  roll_number text,
  attempted_at timestamptz not null default now(),
  success boolean not null default false,
  request_fingerprint text
);

create index public_lookup_attempts_time_idx
  on public.public_lookup_attempts(attempted_at);

-- updated_at triggers
do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles','classes','sections','subjects','students','parents','teachers',
    'student_enrollments','grade_scales','exams','marks','attendance_sessions',
    'assignments','resources','submissions','report_cards','school_settings'
  ]
  loop
    execute format(
      'create trigger %I_updated_at before update on public.%I
       for each row execute function public.set_updated_at()',
      t, t
    );
  end loop;
end $$;

-- Automatically create a profile when a new Supabase Auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles(id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Helper functions for RLS.
create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and is_active = true;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() = 'admin'::public.user_role;
$$;

create or replace function public.current_student_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.students where profile_id = auth.uid();
$$;

create or replace function public.current_parent_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.parents where profile_id = auth.uid();
$$;

create or replace function public.current_teacher_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.teachers where profile_id = auth.uid();
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.sections enable row level security;
alter table public.subjects enable row level security;
alter table public.students enable row level security;
alter table public.parents enable row level security;
alter table public.parent_students enable row level security;
alter table public.teachers enable row level security;
alter table public.teacher_classes enable row level security;
alter table public.teacher_subjects enable row level security;
alter table public.student_enrollments enable row level security;
alter table public.grade_scales enable row level security;
alter table public.grade_scale_ranges enable row level security;
alter table public.exams enable row level security;
alter table public.exam_subjects enable row level security;
alter table public.marks enable row level security;
alter table public.attendance_sessions enable row level security;
alter table public.attendance enable row level security;
alter table public.assignments enable row level security;
alter table public.resources enable row level security;
alter table public.submissions enable row level security;
alter table public.report_cards enable row level security;
alter table public.school_settings enable row level security;
alter table public.public_lookup_attempts enable row level security;

-- Admin: full management.
do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles','classes','sections','subjects','students','parents','parent_students',
    'teachers','teacher_classes','teacher_subjects','student_enrollments',
    'grade_scales','grade_scale_ranges','exams','exam_subjects','marks',
    'attendance_sessions','attendance','assignments','resources','submissions',
    'report_cards','school_settings'
  ]
  loop
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      'admin_all_' || t, t
    );
  end loop;
end $$;

-- Profiles: a user may read/update their own profile.
create policy profiles_self_select on public.profiles
for select to authenticated using (id = auth.uid());

create policy profiles_self_update on public.profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Students can read their own academic data.
create policy student_own_student on public.students
for select to authenticated
using (profile_id = auth.uid());

create policy student_own_enrollment on public.student_enrollments
for select to authenticated
using (student_id = public.current_student_id());

create policy student_own_marks on public.marks
for select to authenticated
using (student_id = public.current_student_id());

create policy student_own_attendance on public.attendance
for select to authenticated
using (student_id = public.current_student_id());

create policy student_own_submissions on public.submissions
for all to authenticated
using (student_id = public.current_student_id())
with check (student_id = public.current_student_id());

create policy student_read_assignments on public.assignments
for select to authenticated
using (
  exists (
    select 1 from public.student_enrollments se
    where se.student_id = public.current_student_id()
      and se.class_id = assignments.class_id
      and (assignments.section_id is null or se.section_id = assignments.section_id)
      and se.is_current = true
  )
);

create policy student_read_resources on public.resources
for select to authenticated
using (
  exists (
    select 1 from public.student_enrollments se
    where se.student_id = public.current_student_id()
      and se.class_id = resources.class_id
      and (resources.section_id is null or se.section_id = resources.section_id)
      and se.is_current = true
  )
);

create policy student_read_exams on public.exams
for select to authenticated
using (
  exists (
    select 1 from public.student_enrollments se
    where se.student_id = public.current_student_id()
      and se.class_id = exams.class_id
      and se.is_current = true
  )
);

create policy student_read_exam_subjects on public.exam_subjects
for select to authenticated
using (
  exists (
    select 1
    from public.exams e
    join public.student_enrollments se on se.class_id = e.class_id
    where e.id = exam_subjects.exam_id
      and se.student_id = public.current_student_id()
      and se.is_current = true
  )
);

create policy student_read_report_cards on public.report_cards
for select to authenticated
using (student_id = public.current_student_id());

-- Parents can read only linked children.
create policy parent_linked_students on public.students
for select to authenticated
using (
  exists (
    select 1 from public.parent_students ps
    where ps.student_id = students.id
      and ps.parent_id = public.current_parent_id()
  )
);

create policy parent_linked_enrollment on public.student_enrollments
for select to authenticated
using (
  exists (
    select 1 from public.parent_students ps
    where ps.student_id = student_enrollments.student_id
      and ps.parent_id = public.current_parent_id()
  )
);

create policy parent_linked_marks on public.marks
for select to authenticated
using (
  exists (
    select 1 from public.parent_students ps
    where ps.student_id = marks.student_id
      and ps.parent_id = public.current_parent_id()
  )
);

create policy parent_linked_attendance on public.attendance
for select to authenticated
using (
  exists (
    select 1 from public.parent_students ps
    where ps.student_id = attendance.student_id
      and ps.parent_id = public.current_parent_id()
  )
);

create policy parent_linked_report_cards on public.report_cards
for select to authenticated
using (
  exists (
    select 1 from public.parent_students ps
    where ps.student_id = report_cards.student_id
      and ps.parent_id = public.current_parent_id()
  )
);

create policy parent_read_assignments on public.assignments
for select to authenticated
using (
  exists (
    select 1
    from public.parent_students ps
    join public.student_enrollments se on se.student_id = ps.student_id and se.is_current = true
    where ps.parent_id = public.current_parent_id()
      and se.class_id = assignments.class_id
      and (assignments.section_id is null or se.section_id = assignments.section_id)
  )
);

create policy parent_read_resources on public.resources
for select to authenticated
using (
  exists (
    select 1
    from public.parent_students ps
    join public.student_enrollments se on se.student_id = ps.student_id and se.is_current = true
    where ps.parent_id = public.current_parent_id()
      and se.class_id = resources.class_id
      and (resources.section_id is null or se.section_id = resources.section_id)
  )
);

-- Teachers can read/manage only their assigned classes/subjects.
create policy teacher_read_classes on public.classes
for select to authenticated
using (
  exists (
    select 1 from public.teacher_classes tc
    join public.teachers t on t.id = tc.teacher_id
    where tc.class_id = classes.id and t.profile_id = auth.uid()
  )
);

create policy teacher_read_sections on public.sections
for select to authenticated
using (
  exists (
    select 1 from public.teacher_classes tc
    join public.teachers t on t.id = tc.teacher_id
    where tc.section_id = sections.id and t.profile_id = auth.uid()
  )
);

create policy teacher_read_subjects on public.subjects
for select to authenticated
using (
  exists (
    select 1 from public.teacher_subjects ts
    join public.teachers t on t.id = ts.teacher_id
    where ts.subject_id = subjects.id and t.profile_id = auth.uid()
  )
);

create policy teacher_read_students on public.students
for select to authenticated
using (
  exists (
    select 1
    from public.teacher_classes tc
    join public.teachers t on t.id = tc.teacher_id
    join public.student_enrollments se on se.class_id = tc.class_id
      and (tc.section_id is null or se.section_id = tc.section_id)
      and se.is_current = true
    where t.profile_id = auth.uid() and se.student_id = students.id
  )
);

create policy teacher_read_enrollments on public.student_enrollments
for select to authenticated
using (
  exists (
    select 1
    from public.teacher_classes tc
    join public.teachers t on t.id = tc.teacher_id
    where t.profile_id = auth.uid()
      and tc.class_id = student_enrollments.class_id
      and (tc.section_id is null or tc.section_id = student_enrollments.section_id)
  )
);

create policy teacher_read_write_marks on public.marks
for all to authenticated
using (
  exists (
    select 1
    from public.exam_subjects es
    join public.exams e on e.id = es.exam_id
    join public.teacher_classes tc on tc.class_id = e.class_id
    join public.teachers t on t.id = tc.teacher_id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = es.subject_id
    where es.id = marks.exam_subject_id and t.profile_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.exam_subjects es
    join public.exams e on e.id = es.exam_id
    join public.teacher_classes tc on tc.class_id = e.class_id
    join public.teachers t on t.id = tc.teacher_id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = es.subject_id
    where es.id = marks.exam_subject_id and t.profile_id = auth.uid()
  )
);

create policy teacher_read_write_attendance_sessions on public.attendance_sessions
for all to authenticated
using (
  exists (
    select 1 from public.teachers t
    join public.teacher_classes tc on tc.teacher_id = t.id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = attendance_sessions.subject_id
    where t.profile_id = auth.uid()
      and tc.class_id = attendance_sessions.class_id
      and (tc.section_id is null or tc.section_id = attendance_sessions.section_id)
  )
)
with check (
  exists (
    select 1 from public.teachers t
    join public.teacher_classes tc on tc.teacher_id = t.id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = attendance_sessions.subject_id
    where t.profile_id = auth.uid()
      and tc.class_id = attendance_sessions.class_id
      and (tc.section_id is null or tc.section_id = attendance_sessions.section_id)
  )
);

create policy teacher_read_write_attendance on public.attendance
for all to authenticated
using (
  exists (
    select 1 from public.attendance_sessions s
    join public.teachers t on t.id = s.teacher_id
    where s.id = attendance.session_id and t.profile_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.attendance_sessions s
    join public.teachers t on t.id = s.teacher_id
    where s.id = attendance.session_id and t.profile_id = auth.uid()
  )
);

create policy teacher_read_write_assignments on public.assignments
for all to authenticated
using (
  exists (
    select 1 from public.teachers t
    join public.teacher_classes tc on tc.teacher_id = t.id and tc.class_id = assignments.class_id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = assignments.subject_id
    where t.profile_id = auth.uid()
      and (tc.section_id is null or tc.section_id = assignments.section_id)
  )
)
with check (
  exists (
    select 1 from public.teachers t
    join public.teacher_classes tc on tc.teacher_id = t.id and tc.class_id = assignments.class_id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = assignments.subject_id
    where t.profile_id = auth.uid()
      and (tc.section_id is null or tc.section_id = assignments.section_id)
  )
);

create policy teacher_read_write_resources on public.resources
for all to authenticated
using (
  exists (
    select 1 from public.teachers t
    join public.teacher_classes tc on tc.teacher_id = t.id and tc.class_id = resources.class_id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = resources.subject_id
    where t.profile_id = auth.uid()
      and (tc.section_id is null or tc.section_id = resources.section_id)
  )
)
with check (
  exists (
    select 1 from public.teachers t
    join public.teacher_classes tc on tc.teacher_id = t.id and tc.class_id = resources.class_id
    join public.teacher_subjects ts on ts.teacher_id = t.id and ts.subject_id = resources.subject_id
    where t.profile_id = auth.uid()
      and (tc.section_id is null or tc.section_id = resources.section_id)
  )
);

-- Public report lookup: only safe identity + aggregate attendance is returned.
create or replace function public.lookup_public_student(
  p_roll_number text,
  p_date_of_birth date
)
returns table(
  student_id uuid,
  full_name text,
  roll_number text,
  class_name text,
  section_name text,
  attendance_percentage numeric
)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.public_lookup_attempts(roll_number, success)
  select p_roll_number, exists(
    select 1 from public.students s
    where s.roll_number = p_roll_number
      and s.date_of_birth = p_date_of_birth
      and s.is_active = true
  );

  return query
  select
    s.id,
    s.full_name,
    s.roll_number,
    c.name,
    sec.name,
    case when count(a.id) = 0 then null
         else round(
           (count(*) filter (where a.status in ('present','late'))::numeric
           / count(*)::numeric) * 100, 2
         )
    end
  from public.students s
  join public.student_enrollments se on se.student_id = s.id and se.is_current = true
  join public.classes c on c.id = se.class_id
  join public.sections sec on sec.id = se.section_id
  left join public.attendance a on a.student_id = s.id
  where s.roll_number = p_roll_number
    and s.date_of_birth = p_date_of_birth
    and s.is_active = true
  group by s.id, s.full_name, s.roll_number, c.name, sec.name;
end;
$$;

revoke all on function public.lookup_public_student(text,date) from public;
grant execute on function public.lookup_public_student(text,date) to anon, authenticated;

-- Storage bucket for academic files.
insert into storage.buckets (id, name, public)
values ('academic-files', 'academic-files', false)
on conflict (id) do nothing;

-- Storage access should be refined further per resource ownership in the API layer.
create policy academic_files_authenticated_read
on storage.objects for select to authenticated
using (bucket_id = 'academic-files');

create policy academic_files_authenticated_insert
on storage.objects for insert to authenticated
with check (bucket_id = 'academic-files');

create policy academic_files_authenticated_update
on storage.objects for update to authenticated
using (bucket_id = 'academic-files')
with check (bucket_id = 'academic-files');
