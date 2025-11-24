-- 1. Allow everyone to view profiles (needed to show names in comments)
-- Drop existing policy if it exists to avoid conflicts (optional, but safer to just create if not exists)
drop policy if exists "Public profiles are viewable by everyone" on profiles;
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- 2. Allow everyone to view comments
drop policy if exists "Anyone can read comments" on comments;
create policy "Anyone can read comments"
  on comments for select
  using ( true );
