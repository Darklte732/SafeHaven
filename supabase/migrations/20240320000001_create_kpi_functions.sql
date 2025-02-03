-- Create function to calculate KPI summary
CREATE OR REPLACE FUNCTION calculate_kpi_summary()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    total_policies INTEGER;
    active_customers INTEGER;
    revenue_growth DECIMAL;
    customer_satisfaction DECIMAL;
    current_month_revenue DECIMAL;
    previous_month_revenue DECIMAL;
BEGIN
    -- Calculate total policies
    SELECT COUNT(*)
    INTO total_policies
    FROM policies
    WHERE status != 'cancelled';

    -- Calculate active customers
    SELECT COUNT(DISTINCT customer_id)
    INTO active_customers
    FROM policies
    WHERE status = 'active';

    -- Calculate revenue growth
    SELECT 
        SUM(CASE WHEN date_trunc('month', created_at) = date_trunc('month', CURRENT_DATE) THEN amount ELSE 0 END),
        SUM(CASE WHEN date_trunc('month', created_at) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month') THEN amount ELSE 0 END)
    INTO current_month_revenue, previous_month_revenue
    FROM payments
    WHERE created_at >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month');

    IF previous_month_revenue > 0 THEN
        revenue_growth := ((current_month_revenue - previous_month_revenue) / previous_month_revenue) * 100;
    ELSE
        revenue_growth := 0;
    END IF;

    -- Calculate customer satisfaction (average rating from feedback)
    SELECT COALESCE(AVG(rating), 0)
    INTO customer_satisfaction
    FROM customer_feedback
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';

    -- Return JSON object with all metrics
    RETURN json_build_object(
        'totalPolicies', total_policies,
        'activeCustomers', active_customers,
        'revenueGrowth', ROUND(revenue_growth::numeric, 2),
        'customerSatisfaction', ROUND(customer_satisfaction::numeric, 2)
    );
END;
$$;

-- Create function to update KPI metrics
CREATE OR REPLACE FUNCTION update_kpi_metrics()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Record the change in KPI history
    INSERT INTO kpi_history (metric_id, value)
    VALUES (NEW.id, NEW.value);

    -- Calculate trend
    WITH previous_value AS (
        SELECT value
        FROM kpi_history
        WHERE metric_id = NEW.id
        ORDER BY timestamp DESC
        LIMIT 1 OFFSET 1
    )
    UPDATE kpi_metrics
    SET trend = CASE 
        WHEN (SELECT value FROM previous_value) > 0 
        THEN ((NEW.value - (SELECT value FROM previous_value)) / (SELECT value FROM previous_value)) * 100
        ELSE 0
    END,
    status = CASE
        WHEN NEW.value >= NEW.target THEN 'positive'::metric_status
        WHEN NEW.value >= NEW.target * 0.8 THEN 'neutral'::metric_status
        ELSE 'negative'::metric_status
    END
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$;

-- Create trigger for KPI metrics updates
CREATE TRIGGER trigger_update_kpi_metrics
    AFTER INSERT OR UPDATE ON kpi_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_kpi_metrics();

-- Create function to record activity
CREATE OR REPLACE FUNCTION record_kpi_activity(
    activity_type activity_type,
    activity_details JSON,
    user_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO kpi_activity (type, details, user_id)
    VALUES (activity_type, activity_details, user_id);
END;
$$; 