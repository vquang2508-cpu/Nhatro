-- Allow authenticated users to insert comments
create policy "Authenticated users can insert comments"
  on comments for insert
  with check ( auth.uid() = user_id );

-- Ensure users can read all comments (if not already set)
create policy "Anyone can read comments"
  on comments for select
  using ( true );
