-- French translations + new fields for existing seeded content

UPDATE profile SET
    title_fr = 'Développeur Full Stack',
    bio_fr = 'Développeur Full Stack spécialisé en Java Spring Boot et Angular, passionné par la création d''applications web propres et évolutives.',
    resume_url = NULL,
    seo_title = 'Mohamed Sy — Développeur Full Stack',
    seo_description = 'Portfolio de Mohamed Sy, Développeur Full Stack spécialisé en Java Spring Boot et Angular.';

UPDATE skills SET icon = 'Coffee', years_experience = 6 WHERE name = 'Java';
UPDATE skills SET icon = 'Leaf', years_experience = 5 WHERE name = 'Spring Boot';
UPDATE skills SET icon = 'Atom', years_experience = 4 WHERE name = 'Angular';
UPDATE skills SET icon = 'FileCode', years_experience = 4 WHERE name = 'TypeScript';
UPDATE skills SET icon = 'Database', years_experience = 5 WHERE name = 'PostgreSQL';
UPDATE skills SET icon = 'Container', years_experience = 3 WHERE name = 'Docker';

UPDATE experiences SET
    role_fr = 'Développeuse Full Stack Senior',
    description_fr = 'Pilotage du développement d''outils SaaS internes avec Spring Boot et Angular.',
    achievements = 'Reduced API response times by 40%; led migration to Spring Boot 4',
    achievements_fr = 'Réduction de 40 % des temps de réponse API ; pilotage de la migration vers Spring Boot 4'
WHERE company = 'Nova Labs';

UPDATE experiences SET
    role_fr = 'Développeur Full Stack',
    description_fr = 'Conception et maintenance d''applications web pour les clients, avec Java et React.',
    achievements = 'Delivered 5+ client projects on time and on budget',
    achievements_fr = 'Livraison de plus de 5 projets clients dans les délais et le budget'
WHERE company = 'Bright Software';

UPDATE projects SET
    summary_fr = 'Un tableau de bord d''administration premium de style SaaS pour gérer un portfolio de développeur.',
    description_fr = 'Tableau de bord d''administration full stack conçu avec Spring Boot 4 et Angular 19, avec authentification JWT, gestion de contenu et analytics.',
    category = 'Full Stack',
    screenshots = ''
WHERE slug = 'portfolio-admin-dashboard';

UPDATE projects SET
    summary_fr = 'Une API RESTful pour la gestion des tâches et projets d''équipe.',
    description_fr = 'Service backend exposant une API REST pour le suivi des tâches, développé avec Spring Boot et sécurisé par JWT.',
    category = 'Backend',
    screenshots = ''
WHERE slug = 'task-management-api';

UPDATE projects SET
    summary_fr = 'Un tableau de bord météo responsive consommant une API publique.',
    description_fr = 'Application Angular affichant des données météo en temps réel avec des graphiques.',
    category = 'Frontend',
    screenshots = ''
WHERE slug = 'weather-dashboard';

UPDATE articles SET
    title_fr = 'Sécuriser une API Spring Boot avec JWT',
    excerpt_fr = 'Un guide pratique pour implémenter l''authentification JWT sans état dans Spring Boot.',
    content_html_fr = '<p>Dans cet article, nous voyons comment implémenter l''authentification JWT dans une application Spring Boot, en couvrant les tokens d''accès, les tokens de rafraîchissement et la configuration de Spring Security.</p>',
    category = 'Backend',
    tags = 'Spring Boot,Security,JWT',
    featured = true
WHERE slug = 'securing-spring-boot-api-with-jwt';

UPDATE articles SET
    title_fr = 'Construire un design system avec PrimeNG',
    excerpt_fr = 'Comment personnaliser les thèmes PrimeNG pour construire un design system cohérent.',
    content_html_fr = '<p>Le système de thématisation de PrimeNG permet de construire facilement un design system cohérent pour les applications Angular. Voici comment j''ai abordé cela pour ce projet.</p>',
    category = 'Frontend',
    tags = 'Angular,PrimeNG,Design System',
    featured = false
WHERE slug = 'building-a-design-system-with-primeng';

-- Education

INSERT INTO education (institution, degree, degree_fr, field, start_date, end_date, description, description_fr, display_order) VALUES
    ('University of Paris-Saclay', 'Master''s Degree', 'Diplôme de Master', 'Computer Science', '2016-09-01', '2018-06-30', 'Specialized in distributed systems and software architecture.', 'Spécialisation en systèmes distribués et architecture logicielle.', 1),
    ('University of Paris-Saclay', 'Bachelor''s Degree', 'Licence', 'Computer Science', '2013-09-01', '2016-06-30', 'Foundations of computer science and software engineering.', 'Fondamentaux de l''informatique et du génie logiciel.', 2);

-- Certifications

INSERT INTO certifications (name, issuer, issue_date, expiry_date, credential_url, display_order) VALUES
    ('AWS Certified Solutions Architect – Associate', 'Amazon Web Services', '2024-03-15', '2027-03-15', 'https://www.credly.com/badges/example-aws', 1),
    ('Professional Scrum Master I', 'Scrum.org', '2023-05-20', NULL, 'https://www.credly.com/badges/example-psm', 2),
    ('Spring Professional Certification', 'VMware', '2022-11-10', NULL, 'https://www.credly.com/badges/example-spring', 3);

-- Testimonials

INSERT INTO testimonials (author_name, author_role, author_role_fr, author_company, quote, quote_fr, published, display_order) VALUES
    ('Sophie Martin', 'Engineering Manager', 'Directrice Ingénierie', 'Nova Labs', 'Mohamed is a rare engineer who combines deep technical expertise with genuine product thinking. His work on our internal SaaS tools raised the bar for the whole team.', 'Mohamed est un ingénieur rare qui allie une expertise technique approfondie à une véritable réflexion produit. Son travail sur nos outils SaaS internes a élevé le niveau de toute l''équipe.', true, 1),
    ('Julien Petit', 'CTO', 'Directeur Technique', 'Bright Software', 'Reliable, thorough, and always thinking about maintainability. Mohamed delivered every project on time without cutting corners.', 'Fiable, minutieux, et toujours soucieux de la maintenabilité. Mohamed a livré chaque projet dans les délais sans jamais sacrifier la qualité.', true, 2);
