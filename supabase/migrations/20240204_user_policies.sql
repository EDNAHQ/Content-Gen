-- First, add user_id columns to tables
ALTER TABLE IF EXISTS "public"."prompts" 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS "public"."content_history" 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS "public"."accounts" 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Then remove existing policies that are too permissive
DROP POLICY IF EXISTS "Allow public read access to prompts" ON prompts;
DROP POLICY IF EXISTS "Allow public insert access to prompts" ON prompts;
DROP POLICY IF EXISTS "Allow public update access to prompts" ON prompts;
DROP POLICY IF EXISTS "Allow public delete access to prompts" ON prompts;
DROP POLICY IF EXISTS "Allow public read access to content_history" ON content_history;
DROP POLICY IF EXISTS "Allow public insert access to content_history" ON content_history;
DROP POLICY IF EXISTS "Allow public read access to accounts" ON accounts;
DROP POLICY IF EXISTS "Allow public insert access to accounts" ON accounts;
DROP POLICY IF EXISTS "Allow public update access to accounts" ON accounts;

-- Create new user-specific policies for prompts
CREATE POLICY "Enable read access for users based on user_id" ON "public"."prompts"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for users based on user_id" ON "public"."prompts"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for users based on user_id" ON "public"."prompts"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete access for users based on user_id" ON "public"."prompts"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create new user-specific policies for content_history
CREATE POLICY "Enable read access for users based on user_id" ON "public"."content_history"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for users based on user_id" ON "public"."content_history"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create new user-specific policies for accounts
CREATE POLICY "Enable read access for users based on user_id" ON "public"."accounts"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for users based on user_id" ON "public"."accounts"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for users based on user_id" ON "public"."accounts"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Enable Row Level Security
ALTER TABLE IF EXISTS "public"."prompts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "public"."content_history" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "public"."accounts" ENABLE ROW LEVEL SECURITY;
