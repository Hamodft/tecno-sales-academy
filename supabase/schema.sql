-- TECNO Sales Academy: independent educational prototype
-- Apply to a dedicated Supabase project after reviewing settings.
-- Required: Auth > disable public signup; invite staff accounts individually.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'learner' check(role in ('learner','trainer','admin')),
  is_employee boolean not null default false,
  is_active boolean not null default true,
  region text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_academy_user()
returns trigger language plpgsql security definer set search_path='' as $$
begin
  insert into public.profiles(id,display_name)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''))
  on conflict (id) do nothing;
  return new;
end;$$;

drop trigger if exists academy_user_created on auth.users;
create trigger academy_user_created after insert on auth.users
for each row execute function public.handle_new_academy_user();

create or replace function public.academy_is_admin()
returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.profiles
    where id=auth.uid() and role='admin' and is_employee=true and is_active=true);
$$;
create or replace function public.academy_is_employee()
returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.profiles
    where id=auth.uid() and is_employee=true and is_active=true);
$$;

create table if not exists public.simulation_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  scenario_id text not null check(length(scenario_id)<=80),
  score integer not null check(score between 0 and 100),
  max_score integer not null default 100 check(max_score=100),
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists attempts_user_date_idx on public.simulation_attempts(user_id,created_at desc);

create table if not exists public.lesson_completions (
  user_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  lesson_id text not null check(length(lesson_id)<=120),
  completed_at timestamptz not null default now(),
  primary key (user_id,lesson_id)
);
create table if not exists public.content_overrides (
  key text primary key,
  body jsonb not null,
  visibility text not null check (visibility in ('public','employee')),
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create or replace function public.academy_stamp_content()
returns trigger language plpgsql security definer set search_path='' as $$
begin
  new.updated_by=auth.uid();
  new.updated_at=now();
  return new;
end;$$;
drop trigger if exists academy_content_stamp on public.content_overrides;
create trigger academy_content_stamp before insert or update on public.content_overrides
for each row execute function public.academy_stamp_content();

alter table public.profiles enable row level security;
alter table public.simulation_attempts enable row level security;
alter table public.lesson_completions enable row level security;
alter table public.content_overrides enable row level security;

drop policy if exists academy_profiles_read on public.profiles;
create policy academy_profiles_read on public.profiles for select to authenticated
using(id=auth.uid() or public.academy_is_admin());
drop policy if exists academy_profiles_admin_update on public.profiles;
create policy academy_profiles_admin_update on public.profiles for update to authenticated
using(public.academy_is_admin()) with check(public.academy_is_admin());

drop policy if exists academy_attempt_read on public.simulation_attempts;
create policy academy_attempt_read on public.simulation_attempts for select to authenticated
using((user_id=auth.uid() and public.academy_is_employee()) or public.academy_is_admin());
drop policy if exists academy_attempt_write on public.simulation_attempts;
create policy academy_attempt_write on public.simulation_attempts for insert to authenticated
with check(user_id=auth.uid() and public.academy_is_employee() and jsonb_typeof(answers)='array');

drop policy if exists academy_lessons_read on public.lesson_completions;
create policy academy_lessons_read on public.lesson_completions for select to authenticated
using((user_id=auth.uid() and public.academy_is_employee()) or public.academy_is_admin());
drop policy if exists academy_lessons_write on public.lesson_completions;
create policy academy_lessons_write on public.lesson_completions for insert to authenticated
with check(user_id=auth.uid() and public.academy_is_employee());

drop policy if exists academy_content_read on public.content_overrides;
create policy academy_content_read on public.content_overrides for select to anon,authenticated
using(visibility='public' or (visibility='employee' and public.academy_is_employee()) or public.academy_is_admin());
drop policy if exists academy_content_insert on public.content_overrides;
create policy academy_content_insert on public.content_overrides for insert to authenticated
with check(public.academy_is_admin());
drop policy if exists academy_content_update on public.content_overrides;
create policy academy_content_update on public.content_overrides for update to authenticated
using(public.academy_is_admin()) with check(public.academy_is_admin());
drop policy if exists academy_content_delete on public.content_overrides;
create policy academy_content_delete on public.content_overrides for delete to authenticated
using(public.academy_is_admin());

-- Bootstrap admin only using the trusted Supabase SQL editor, never from the browser:
-- update public.profiles set role='admin', is_employee=true
-- where id='<ID of previously invited and signed-in user>';

-- SECURITY LIMITATION:
-- Client-supplied attempt scores are formative only. Before using them as HR
-- performance metrics, compute and validate scores server-side from versioned
-- scenario definitions in an authenticated backend function.
