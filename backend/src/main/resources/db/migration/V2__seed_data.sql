-- Default admin account. Password: Admin@123 (change immediately after first login).
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@portfolio.dev', '$2b$10$yl/JJqIKNiChYyzS3.QbYOj8qriRNoXVITpYcBkPaHP2qSGI2jJOO', 'ADMIN');

-- Demo metrics so the dashboard is populated before real content modules exist.
INSERT INTO dashboard_statistics (metric_key, metric_value) VALUES
    ('total_projects', 12),
    ('total_skills', 24),
    ('total_experiences', 5),
    ('total_articles', 8),
    ('new_messages', 3);
