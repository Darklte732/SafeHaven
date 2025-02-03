-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    notifications JSONB NOT NULL DEFAULT '{
        "email": true,
        "desktop": false,
        "mobile": true,
        "sound": true,
        "criticalAlerts": true,
        "dailyDigest": true,
        "weeklyReport": true
    }',
    dashboard JSONB NOT NULL DEFAULT '{
        "autoRefresh": true,
        "refreshInterval": 5,
        "darkMode": true,
        "compactView": false,
        "showGraphs": true,
        "defaultView": "all",
        "cardLayout": "grid"
    }',
    ai_agents JSONB NOT NULL DEFAULT '{
        "autoAssign": true,
        "maxConcurrentChats": 5,
        "handoffThreshold": 80,
        "responseDelay": 1000,
        "maxQueueSize": 10,
        "priorityClients": []
    }',
    voice JSONB NOT NULL DEFAULT '{
        "autoRecord": true,
        "transcription": true,
        "sentimentAnalysis": true,
        "qualityMonitoring": true,
        "noiseReduction": true,
        "saveRecordings": true,
        "recordingRetentionDays": 30
    }',
    security JSONB NOT NULL DEFAULT '{
        "twoFactorAuth": false,
        "sessionTimeout": 30,
        "ipWhitelist": [],
        "loginAttempts": 5,
        "passwordExpiry": 90
    }',
    customization JSONB NOT NULL DEFAULT '{
        "primaryColor": "#1D4ED8",
        "accentColor": "#3B82F6",
        "logo": null,
        "brandName": "SafeHaven Insurance",
        "timezone": "America/New_York",
        "dateFormat": "MM/DD/YYYY",
        "timeFormat": "12h"
    }',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create admin_logs table
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    action TEXT NOT NULL,
    details JSONB,
    admin_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_settings
CREATE POLICY "Allow read access for authenticated users" ON admin_settings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow update for admin users" ON admin_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email LIKE '%@safehaven.com'
        )
    );

-- Create policies for admin_logs
CREATE POLICY "Allow read access for admin users" ON admin_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email LIKE '%@safehaven.com'
        )
    );

CREATE POLICY "Allow insert for admin users" ON admin_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email LIKE '%@safehaven.com'
        )
    );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_admin_settings_updated_at
    BEFORE UPDATE ON admin_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 