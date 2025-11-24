-- Create storage bucket for listing images
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload listing images
create policy "Authenticated users can upload listing images"
on storage.objects for insert
with check (
  bucket_id = 'listing-images' 
  and auth.role() = 'authenticated'
);

-- Allow public read access
create policy "Public can view listing images"
on storage.objects for select
using ( bucket_id = 'listing-images' );

-- Allow users to delete their own uploads
create policy "Users can delete own listing images"
on storage.objects for delete
using (
  bucket_id = 'listing-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);
