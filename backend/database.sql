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


----------------------------------------------------------------------------- 


-- =========================================================
-- 1️⃣ Taula recipes
-- =========================================================
create table public.recipes (
    id uuid primary key default gen_random_uuid(),
    author_id uuid not null
        references public.profiles(id)
        on delete cascade,
    title text not null,
    description text not null,
    cooking_time integer check (cooking_time > 0),
    servings integer check (servings > 0),
    calories integer check (calories >= 0),
    image_url text,
    ingredients jsonb not null,
    steps jsonb not null,
    category text not null,
    is_public boolean default true,
    is_ai_generated boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Trigger updated_at per recipes
create or replace function public.update_recipe_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists set_recipe_updated_at on public.recipes;
create trigger set_recipe_updated_at
before update on public.recipes
for each row
execute procedure public.update_recipe_updated_at();

-- Enable RLS i policies
alter table public.recipes enable row level security;

-- Select: només públiques o pròpies
create policy "Users can view public recipes or own recipes"
on public.recipes
for select
to authenticated
using (
    is_public = true
    OR auth.uid() = author_id
);

-- Insert: només usuari autenticat pot crear les seves
create policy "Users can insert own recipes"
on public.recipes
for insert
to authenticated
with check (auth.uid() = author_id);

-- Update: només el propietari
create policy "Users can update own recipes"
on public.recipes
for update
to authenticated
using (auth.uid() = author_id);

-- Delete: només el propietari
create policy "Users can delete own recipes"
on public.recipes
for delete
to authenticated
using (auth.uid() = author_id);

-- =========================================================
-- 2️⃣ Taula recipe_likes
-- =========================================================
create table public.recipe_likes (
    user_id uuid references public.profiles(id) on delete cascade,
    recipe_id uuid references public.recipes(id) on delete cascade,
    created_at timestamptz default now(),
    primary key (user_id, recipe_id)
);

alter table public.recipe_likes enable row level security;

-- Select: només veure likes propis
create policy "Users can view own likes"
on public.recipe_likes
for select
to authenticated
using (auth.uid() = user_id);

-- Insert: només usuari autenticat pot likejar
create policy "Users can insert own likes"
on public.recipe_likes
for insert
to authenticated
with check (auth.uid() = user_id);

-- Delete: només usuari autenticat pot treure likes seus
create policy "Users can delete own likes"
on public.recipe_likes
for delete
to authenticated
using (auth.uid() = user_id);

-- =========================================================
-- 3️⃣ Taula recipe_comments
-- =========================================================
create table public.recipe_comments (
    id uuid primary key default gen_random_uuid(),
    recipe_id uuid references public.recipes(id) on delete cascade,
    author_id uuid references public.profiles(id) on delete cascade,
    content text not null,
    created_at timestamptz default now()
);

alter table public.recipe_comments enable row level security;

-- Select: tothom pot veure comentaris de receptes públiques
create policy "Users can view comments on public recipes"
on public.recipe_comments
for select
to authenticated
using (
    exists (
        select 1
        from public.recipes r
        where r.id = recipe_id
        and (r.is_public = true OR auth.uid() = r.author_id)
    )
);

-- Insert: només usuari autenticat pot comentar
create policy "Users can insert own comments"
on public.recipe_comments
for insert
to authenticated
with check (auth.uid() = author_id);

-- Update: només autor del comentari
create policy "Users can update own comments"
on public.recipe_comments
for update
to authenticated
using (auth.uid() = author_id);

-- Delete: només autor del comentari
create policy "Users can delete own comments"
on public.recipe_comments
for delete
to authenticated
using (auth.uid() = author_id);

-- =========================================================
-- 4️⃣ Taula recipe_saves
-- =========================================================
create table public.recipe_saves (
    user_id uuid references public.profiles(id) on delete cascade,
    recipe_id uuid references public.recipes(id) on delete cascade,
    created_at timestamptz default now(),
    primary key (user_id, recipe_id)
);

alter table public.recipe_saves enable row level security;

-- Select: només veus els teus guardats
create policy "Users can view own saved recipes"
on public.recipe_saves
for select
to authenticated
using (auth.uid() = user_id);

-- Insert: només sobre propis guardats
create policy "Users can insert own saved recipes"
on public.recipe_saves
for insert
to authenticated
with check (auth.uid() = user_id);

-- Delete: només sobre propis guardats
create policy "Users can delete own saved recipes"
on public.recipe_saves
for delete
to authenticated
using (auth.uid() = user_id);

-- =========================================================
-- 5️⃣ Indexos mínims per mur i filtrat
-- =========================================================
create index recipes_created_at_idx on public.recipes (created_at desc);
create index recipes_category_idx on public.recipes (category);
create index recipes_is_public_idx on public.recipes (is_public);