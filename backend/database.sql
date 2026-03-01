-- Creem la taula de perfils
-- 1. Creem la taula de perfils
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Activem la seguretat de fila (RLS)
-- Això fa que la taula no estigui oberta a tothom per defecte
alter table public.profiles enable row level security;

-- 3. Creem la política de lectura
-- Permet que qualsevol usuari (loguejat o no) pugui veure els perfils
create policy "Els perfils són visibles per a tothom"
on public.profiles for select
using ( true );

-- 4. Creem la política d'edició
-- Només l'amo del perfil pot modificar les seves pròpies dades
create policy "Els usuaris poden editar el seu propi perfil"
on public.profiles for update
using ( auth.uid() = id );


----------------------------------------------------------------------------- 


-- 1. Funció que crea el perfil amb un username temporal segur
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    username,
    full_name,
    avatar_url,
    created_at,
    updated_at
  )
  values (
    new.id,
    'user_' || substr(new.id::text, 1, 8),
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name'
    ),
    new.raw_user_meta_data->>'avatar_url',
    now(),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Eliminem trigger anterior si existeix
drop trigger if exists on_auth_user_created on auth.users;

-- 3. Creem el trigger
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


----------------------------------------------------------------------------- 


-- 1. Afegim la columna de control si no existeix
alter table public.profiles 
add column if not exists is_setup boolean default false;

-- 2. Actualitzem la funció del robot perquè sàpiga que els nous són "is_setup = false"
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    username,
    full_name,
    avatar_url,
    is_setup
  )
  values (
    new.id,
    'user_' || substr(new.id::text, 1, 8),
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name'
    ),
    new.raw_user_meta_data->>'avatar_url',
    false -- Aquí marquem que encara ha de triar nom!
  );
  return new;
end;
$$ language plpgsql security definer;


----------------------------------------------------------------------------- 


-- Creem la funció que posa la data actual
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Eliminem el trigger si ja existia per no duplicar
drop trigger if exists set_updated_at on public.profiles;

-- Creem el trigger que s'executa ABANS de qualsevol UPDATE
create trigger set_updated_at
before update on public.profiles
for each row
execute procedure public.update_updated_at_column();


----------------------------------------------------------------------------- 


-- 1. Eliminem la política antiga "oberta"
drop policy if exists "Els perfils són visibles per a tothom" on public.profiles;

-- 2. Creem la nova política restringida a usuaris loguejats
create policy "Perfils visibles només per a usuaris autenticats"
on public.profiles for select
to authenticated
using ( true );


----------------------------------------------------------------------------- 


create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    username,
    full_name,
    avatar_url,
    is_setup
  )
  values (
    new.id,
    'user_' || substr(new.id::text, 1, 8),
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name'
    ),
    new.raw_user_meta_data->>'avatar_url',
    false
  );
  return new;
end;
$$ language plpgsql security definer;