-- Insert default admin settings
INSERT INTO admin_settings (id, notifications, dashboard, ai_agents, voice, security, customization)
VALUES (
  gen_random_uuid(),
  '{
    "email": true,
    "desktop": false,
    "mobile": true,
    "sound": true,
    "criticalAlerts": true,
    "dailyDigest": true,
    "weeklyReport": true
  }',
  '{
    "autoRefresh": true,
    "refreshInterval": 5,
    "darkMode": true,
    "compactView": false,
    "showGraphs": true,
    "defaultView": "all",
    "cardLayout": "grid"
  }',
  '{
    "autoAssign": true,
    "maxConcurrentChats": 5,
    "handoffThreshold": 80,
    "responseDelay": 1000,
    "maxQueueSize": 10,
    "priorityClients": []
  }',
  '{
    "autoRecord": true,
    "transcription": true,
    "sentimentAnalysis": true,
    "qualityMonitoring": true,
    "noiseReduction": true,
    "saveRecordings": true,
    "recordingRetentionDays": 30
  }',
  '{
    "twoFactorAuth": false,
    "sessionTimeout": 30,
    "ipWhitelist": [],
    "loginAttempts": 5,
    "passwordExpiry": 90
  }',
  '{
    "primaryColor": "#1D4ED8",
    "accentColor": "#3B82F6",
    "logo": null,
    "brandName": "SafeHaven Insurance",
    "timezone": "America/New_York",
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "12h"
  }'
); 

-- Insert sample KPI metrics
INSERT INTO kpi_metrics (name, value, target, unit, trend, status, category, period)
VALUES
  ('Monthly Revenue', 125000.00, 100000.00, 'USD', 15.2, 'positive', 'financial', 'monthly'),
  ('New Policies', 450, 400, 'count', 12.5, 'positive', 'sales', 'monthly'),
  ('Claims Ratio', 0.15, 0.20, 'ratio', -5.0, 'positive', 'operational', 'monthly'),
  ('Customer Retention', 0.92, 0.85, 'ratio', 2.1, 'positive', 'customer', 'monthly'),
  ('Average Premium', 1200.00, 1000.00, 'USD', 8.3, 'positive', 'financial', 'monthly'),
  ('Policy Renewals', 380, 350, 'count', 8.6, 'positive', 'sales', 'monthly'),
  ('Processing Time', 2.5, 3.0, 'days', -16.7, 'positive', 'operational', 'monthly'),
  ('NPS Score', 8.5, 8.0, 'score', 6.3, 'positive', 'customer', 'monthly');

-- Insert sample agent performance data
INSERT INTO agent_performance (agent_id, policies_sold, revenue, period_start, period_end)
VALUES
  ('d7f33c7a-8d6b-4a2e-8f0a-5e832b483bf1', 45, 54000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('e9b12f3c-4d5e-6a7b-8c9d-0e1f2a3b4c5d', 38, 45600.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5e6f', 35, 42000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 32, 38400.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 30, 36000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE);

-- Insert sample product performance data
INSERT INTO product_performance (product_id, sales_count, revenue, period_start, period_end)
VALUES
  ('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 150, 180000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('p2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 120, 144000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('p3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 100, 120000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('p4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', 80, 96000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE),
  ('p5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0', 60, 72000.00, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE);

-- Insert sample activity data
INSERT INTO kpi_activity (type, details, user_id)
VALUES
  ('policy_created', '{"policy_id": "pol123", "customer_name": "John Doe", "premium": 1200.00}', 'u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6'),
  ('policy_renewed', '{"policy_id": "pol456", "customer_name": "Jane Smith", "premium": 950.00}', 'u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7'),
  ('claim_filed', '{"claim_id": "clm789", "policy_id": "pol789", "amount": 5000.00}', 'u3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8'),
  ('payment_received', '{"payment_id": "pay123", "policy_id": "pol123", "amount": 1200.00}', 'u4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9'),
  ('policy_created', '{"policy_id": "pol124", "customer_name": "Bob Wilson", "premium": 1500.00}', 'u5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0'),
  ('claim_filed', '{"claim_id": "clm790", "policy_id": "pol456", "amount": 3000.00}', 'u6f7a8b9-c0d1-e2f3-a4b5-c6d7e8f9a0b1'),
  ('payment_received', '{"payment_id": "pay124", "policy_id": "pol124", "amount": 1500.00}', 'u7a8b9c0-d1e2-f3a4-b5c6-d7e8f9a0b1c2'),
  ('policy_renewed', '{"policy_id": "pol125", "customer_name": "Alice Brown", "premium": 1100.00}', 'u8b9c0d1-e2f3-a4b5-c6d7-e8f9a0b1c2d3'),
  ('policy_created', '{"policy_id": "pol126", "customer_name": "Charlie Davis", "premium": 1300.00}', 'u9c0d1e2-f3a4-b5c6-d7e8-f9a0b1c2d3e4'),
  ('payment_received', '{"payment_id": "pay125", "policy_id": "pol125", "amount": 1100.00}', 'u0d1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5'); 