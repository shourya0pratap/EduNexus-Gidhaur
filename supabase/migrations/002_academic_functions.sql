-- Reusable academic calculations in PostgreSQL.
create or replace function public.calculate_exam_percentage(p_exam_id uuid, p_student_id uuid)
returns numeric
language sql
stable
security definer
set search_path=public
as $$
  select coalesce(
    round(
      (sum(m.marks_obtained)::numeric / nullif(sum(es.maximum_marks),0)) * 100,
      2
    ), 0
  )
  from public.marks m
  join public.exam_subjects es on es.id=m.exam_subject_id
  where es.exam_id=p_exam_id and m.student_id=p_student_id;
$$;

revoke all on function public.calculate_exam_percentage(uuid,uuid) from public;
grant execute on function public.calculate_exam_percentage(uuid,uuid) to authenticated;

create or replace view public.exam_mark_summary as
select
  e.id as exam_id,
  e.name as exam_name,
  e.class_id,
  m.student_id,
  sum(m.marks_obtained) as total_marks,
  sum(es.maximum_marks) as maximum_marks,
  round((sum(m.marks_obtained)::numeric / nullif(sum(es.maximum_marks),0))*100,2) as percentage
from public.exams e
join public.exam_subjects es on es.exam_id=e.id
join public.marks m on m.exam_subject_id=es.id
group by e.id,e.name,e.class_id,m.student_id;
