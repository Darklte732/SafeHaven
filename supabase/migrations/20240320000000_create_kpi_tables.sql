-- Create enum types
CREATE TYPE metric_category AS ENUM ('financial', 'operational', 'customer', 'sales');
CREATE TYPE metric_period AS ENUM ('daily', 'weekly', 'monthly', 'quarterly', 'yearly');
CREATE TYPE metric_status AS ENUM ('positive', 'negative', 'neutral');
CREATE TYPE activity_type AS ENUM ('policy_created', 'policy_renewed', 'claim_filed', 'payment_received');

-- Create KPI metrics table
CREATE TABLE kpi_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    target DECIMAL(15,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    trend DECIMAL(5,2) NOT NULL,
    status metric_status NOT NULL,
    category metric_category NOT NULL,
    period metric_period NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create KPI history table for tracking metric changes
CREATE TABLE kpi_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_id UUID REFERENCES kpi_metrics(id) ON DELETE CASCADE,
    value DECIMAL(15,2) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create table for top performing agents
CREATE TABLE agent_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL,
    policies_sold INTEGER NOT NULL DEFAULT 0,
    revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create table for product performance
CREATE TABLE product_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL,
    sales_count INTEGER NOT NULL DEFAULT 0,
    revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create table for activity tracking
CREATE TABLE kpi_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type activity_type NOT NULL,
    details JSONB NOT NULL DEFAULT '{}',
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_kpi_metrics_category ON kpi_metrics(category);
CREATE INDEX idx_kpi_metrics_period ON kpi_metrics(period);
CREATE INDEX idx_kpi_history_metric_id ON kpi_history(metric_id);
CREATE INDEX idx_kpi_history_timestamp ON kpi_history(timestamp);
CREATE INDEX idx_agent_performance_period ON agent_performance(period_start, period_end);
CREATE INDEX idx_product_performance_period ON product_performance(period_start, period_end);
CREATE INDEX idx_kpi_activity_type ON kpi_activity(type);
CREATE INDEX idx_kpi_activity_timestamp ON kpi_activity(timestamp);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_kpi_metrics_updated_at
    BEFORE UPDATE ON kpi_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE kpi_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_activity ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow read access to authenticated users" ON kpi_metrics
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON kpi_history
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON agent_performance
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON product_performance
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON kpi_activity
    FOR SELECT TO authenticated USING (true);

-- Create policies for admin users (modify as needed based on your user roles)
CREATE POLICY "Allow full access to admin users" ON kpi_metrics
    FOR ALL TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow full access to admin users" ON kpi_history
    FOR ALL TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin'); 