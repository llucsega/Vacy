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