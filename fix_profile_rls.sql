-- Check current policies on profiles table
select * from pg_policies where tablename = 'profiles';

-- If the above shows no SELECT policy, run this:
-- Allow everyone to view profiles (needed for comment username display)
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );
