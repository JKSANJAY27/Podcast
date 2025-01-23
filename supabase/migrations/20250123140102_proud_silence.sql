/*
  # Create subscribers table for newsletter

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert subscribers"
  ON subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can read subscribers"
  ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);