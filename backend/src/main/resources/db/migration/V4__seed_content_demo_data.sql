INSERT INTO profile (full_name, title, bio, email, location, github_url, linkedin_url, website_url)
VALUES (
    'Mohamed Sy',
    'Full Stack Developer',
    'Full Stack Developer specializing in Java Spring Boot and Angular, focused on building clean, scalable web applications.',
    'admin@portfolio.dev',
    'Paris, France',
    'https://github.com/mohamedsy',
    'https://linkedin.com/in/mohamedsy',
    'https://mohamedsy.dev'
);

INSERT INTO skills (name, category, proficiency, display_order) VALUES
    ('Java', 'Backend', 5, 1),
    ('Spring Boot', 'Backend', 5, 2),
    ('Angular', 'Frontend', 4, 3),
    ('TypeScript', 'Frontend', 4, 4),
    ('PostgreSQL', 'Database', 4, 5),
    ('Docker', 'DevOps', 3, 6);

INSERT INTO experiences (company, role, location, start_date, end_date, description, display_order) VALUES
    ('Nova Labs', 'Senior Full Stack Developer', 'Remote', '2023-01-01', NULL, 'Leading development of internal SaaS tools using Spring Boot and Angular.', 1),
    ('Bright Software', 'Full Stack Developer', 'Paris, France', '2020-06-01', '2022-12-31', 'Built and maintained customer-facing web applications with Java and React.', 2);

INSERT INTO projects (title, slug, summary, description, tech_stack, repo_url, live_url, featured, display_order) VALUES
    ('Portfolio Admin Dashboard', 'portfolio-admin-dashboard', 'A premium SaaS-style admin dashboard for managing a developer portfolio.', 'Full stack admin dashboard built with Spring Boot 4 and Angular 19, featuring JWT auth, content management, and analytics.', 'Spring Boot,Angular,PostgreSQL,PrimeNG', 'https://github.com/mohamedsy/portfolio', NULL, true, 1),
    ('Task Management API', 'task-management-api', 'A RESTful API for managing team tasks and projects.', 'Backend service exposing a REST API for task tracking, built with Spring Boot and secured with JWT.', 'Spring Boot,PostgreSQL,Docker', 'https://github.com/mohamedsy/task-api', NULL, false, 2),
    ('Weather Dashboard', 'weather-dashboard', 'A responsive weather dashboard consuming a public weather API.', 'Angular single-page application displaying real-time weather data with charts.', 'Angular,Chart.js,RxJS', 'https://github.com/mohamedsy/weather-dashboard', NULL, false, 3);

INSERT INTO articles (title, slug, excerpt, content_html, published, published_at) VALUES
    ('Securing a Spring Boot API with JWT', 'securing-spring-boot-api-with-jwt', 'A practical guide to implementing stateless JWT authentication in Spring Boot.', '<p>In this article, we walk through implementing JWT-based authentication in a Spring Boot application, covering access tokens, refresh tokens, and Spring Security configuration.</p>', true, now() - interval '4 days'),
    ('Building a Design System with PrimeNG', 'building-a-design-system-with-primeng', 'How to customize PrimeNG themes to build a consistent design system.', '<p>PrimeNG''s theming system makes it straightforward to build a cohesive design system for Angular applications. Here is how I approached it for this project.</p>', true, now() - interval '2 days');

INSERT INTO messages (sender_name, sender_email, subject, body, read) VALUES
    ('Sarah Chen', 'sarah.chen@example.com', 'Collaboration opportunity', 'Hi, I came across your portfolio and I''m interested in discussing a potential collaboration on an upcoming project.', false),
    ('Marc Dubois', 'marc.dubois@example.com', 'Freelance availability', 'Loved your portfolio! Are you available for freelance work over the next few months?', false),
    ('HR at Nova Labs', 'hr@novalabs.example.com', 'Technical interview', 'We would like to schedule a technical interview based on your application. Please let us know your availability.', true);
