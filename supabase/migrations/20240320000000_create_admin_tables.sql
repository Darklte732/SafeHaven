-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create agents table
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    role TEXT NOT NULL DEFAULT 'agent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create agent_activity table
CREATE TABLE agent_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id),
    activity_type TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create sales_stages table
CREATE TABLE sales_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    order_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create client_progress table
CREATE TABLE client_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES auth.users(id),
    agent_id UUID REFERENCES agents(id),
    stage_id UUID REFERENCES sales_stages(id),
    status TEXT NOT NULL DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create performance_metrics table
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID REFERENCES agents(id),
    metric_type TEXT NOT NULL,
    value NUMERIC NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create admin_settings table
CREATE TABLE admin_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Insert default sales stages
INSERT INTO sales_stages (name, description, order_number) VALUES
    ('Initial Contact', 'First contact with the client', 1),
    ('Needs Assessment', 'Gathering client requirements and preferences', 2),
    ('Quote Presentation', 'Presenting insurance quotes to the client', 3),
    ('Application', 'Completing the insurance application', 4),
    ('Underwriting', 'Application under review by underwriting', 5),
    ('Policy Delivery', 'Delivering the final policy to the client', 6),
    ('Closed', 'Sale completed and policy active', 7);

-- Create indexes for better query performance
CREATE INDEX idx_agent_activity_agent_id ON agent_activity(agent_id);
CREATE INDEX idx_client_progress_agent_id ON client_progress(agent_id);
CREATE INDEX idx_client_progress_client_id ON client_progress(client_id);
CREATE INDEX idx_performance_metrics_agent_id ON performance_metrics(agent_id);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Allow admins full access to agents"
    ON agents
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admins full access to agent_activity"
    ON agent_activity
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admins full access to sales_stages"
    ON sales_stages
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admins full access to client_progress"
    ON client_progress
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admins full access to performance_metrics"
    ON performance_metrics
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admins full access to admin_settings"
    ON admin_settings
    USING (auth.jwt() ->> 'role' = 'admin');

-- Create function to check admin access code
CREATE OR REPLACE FUNCTION check_admin_access_code(access_code TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN access_code = 'Pro2025';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 