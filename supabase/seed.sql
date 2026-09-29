-- Demo/reference seed data. Run after the schema.
-- Auth identities should be created through Supabase Auth first.
-- Replace these UUIDs with real auth user IDs if linking profiles.

insert into public.school_settings
  (school_name, address, phone, email, website, principal_name)
values
  ('Gidhaur Central School',
   'Gidhaur, Jamui, Bihar',
   '+91 00000 00000',
   'office@example.edu',
   null,
   'Principal')
on conflict do nothing;

insert into public.classes (name, academic_year)
values
  ('6-A','2026-27'), ('7-A','2026-27'), ('8-A','2026-27'),
  ('9-A','2026-27'), ('10-A','2026-27'), ('11-A','2026-27'),
  ('12-A','2026-27')
on conflict do nothing;

insert into public.subjects (name, code)
values
  ('English','ENG'),
  ('Hindi','HIN'),
  ('Mathematics','MATH'),
  ('Science','SCI'),
  ('Social Science','SST'),
  ('Computer Science','CS')
on conflict do nothing;

insert into public.grade_scales (name, description, is_default)
values ('Default School Scale', 'Configurable 0-100 percentage grading scale.', true)
on conflict do nothing;

insert into public.grade_scale_ranges (grade_scale_id, grade, min_percentage, max_percentage)
select gs.id, v.grade, v.min_percentage, v.max_percentage
from public.grade_scales gs
cross join (values
  ('A+',90,100), ('A',80,89.99), ('B+',70,79.99),
  ('B',60,69.99), ('C',50,59.99), ('D',40,49.99), ('F',0,39.99)
) as v(grade,min_percentage,max_percentage)
where gs.name = 'Default School Scale'
on conflict do nothing;
