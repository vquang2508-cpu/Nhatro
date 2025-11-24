-- Allow users to view their own listings regardless of visibility
create policy "Users can view own listings"
  on public.listings for select
  using ( auth.uid() = user_id );
