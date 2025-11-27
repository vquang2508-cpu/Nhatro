-- Add DELETE policy for admin role
-- This allows users with 'admin' role to delete any listing

-- First, check if the policy already exists and drop it if needed
DROP POLICY IF EXISTS "Admins can delete any listing" ON listings;

-- Create the DELETE policy for admins
CREATE POLICY "Admins can delete any listing"
ON listings
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Verify the policy was created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'listings'
ORDER BY policyname;
