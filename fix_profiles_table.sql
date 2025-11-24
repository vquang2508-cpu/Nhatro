-- 1. Check if profiles table has full_name column
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles';

-- 2. If full_name doesn't exist, add it:
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name text;

-- 3. Update existing profiles with email as full_name (temporary)
UPDATE profiles 
SET full_name = email 
WHERE full_name IS NULL;

-- 4. Check foreign key relationship
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'comments' AND tc.constraint_type = 'FOREIGN KEY';
