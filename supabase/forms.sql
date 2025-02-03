-- Create the forms table
CREATE TABLE forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Personal Information
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  dob DATE NOT NULL,
  ssn TEXT NOT NULL,
  height TEXT NOT NULL,
  weight TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  
  -- Address
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  
  -- Insurance Details
  coverage_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  tobacco_use BOOLEAN NOT NULL DEFAULT false,
  medical_conditions TEXT,
  
  -- Beneficiary Information
  beneficiary_name TEXT NOT NULL,
  beneficiary_relationship TEXT NOT NULL,
  
  -- Payment Information
  draft_day INTEGER NOT NULL,
  routing_number TEXT NOT NULL,
  account_number TEXT NOT NULL,
  
  -- Additional Information
  has_drivers_license BOOLEAN NOT NULL DEFAULT true,
  birth_country TEXT NOT NULL DEFAULT 'United States',
  is_us_citizen BOOLEAN NOT NULL DEFAULT true,
  
  -- Medical Questions
  has_high_blood_pressure BOOLEAN NOT NULL DEFAULT false,
  has_heart_disease BOOLEAN NOT NULL DEFAULT false,
  has_diabetes BOOLEAN NOT NULL DEFAULT false,
  
  -- Existing Insurance
  has_existing_insurance BOOLEAN NOT NULL DEFAULT false,
  will_replace_insurance BOOLEAN NOT NULL DEFAULT false,
  has_pending_insurance BOOLEAN NOT NULL DEFAULT false,
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_by UUID REFERENCES auth.users(id),
  pdf_url TEXT,
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to read forms"
  ON forms FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert forms"
  ON forms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow authenticated users to update their forms"
  ON forms FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create an index on the status column for faster filtering
CREATE INDEX forms_status_idx ON forms(status);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to call the function before each update
CREATE TRIGGER update_forms_updated_at
  BEFORE UPDATE ON forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 