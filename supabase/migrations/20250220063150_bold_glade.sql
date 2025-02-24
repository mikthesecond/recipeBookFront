/*
  # Create recipes table and admin policies

  1. New Tables
    - `recipes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `rating` (numeric)
      - `prep_time` (text)
      - `servings` (integer)
      - `image` (text)
      - `chef` (text)
      - `description` (text)
      - `ingredients` (text[])
      - `instructions` (text[])
      - `created_at` (timestamptz)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `recipes` table
    - Add policies for:
      - Public read access
      - Admin-only write access
*/

CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  rating numeric NOT NULL DEFAULT 0,
  prep_time text NOT NULL,
  servings integer NOT NULL,
  image text NOT NULL,
  chef text NOT NULL,
  description text,
  ingredients text[],
  instructions text[],
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can read recipes"
  ON recipes
  FOR SELECT
  TO public
  USING (true);

-- Allow admin users to create recipes
CREATE POLICY "Admins can create recipes"
  ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@admin.com'
    )
  );

-- Allow admin users to update their own recipes
CREATE POLICY "Admins can update their own recipes"
  ON recipes
  FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@admin.com'
    )
  )
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@admin.com'
    )
  );

-- Allow admin users to delete their own recipes
CREATE POLICY "Admins can delete their own recipes"
  ON recipes
  FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email LIKE '%@admin.com'
    )
  );