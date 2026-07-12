-- New tables for public site content

CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    degree_fr VARCHAR(200),
    field VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    description_fr TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    issuer VARCHAR(200) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    credential_url VARCHAR(500),
    badge_image_url VARCHAR(500),
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name VARCHAR(150) NOT NULL,
    author_role VARCHAR(150),
    author_role_fr VARCHAR(150),
    author_company VARCHAR(150),
    avatar_url VARCHAR(500),
    quote TEXT NOT NULL,
    quote_fr TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Extend existing tables

ALTER TABLE profile
    ADD COLUMN title_fr VARCHAR(150),
    ADD COLUMN bio_fr TEXT,
    ADD COLUMN resume_url VARCHAR(500),
    ADD COLUMN seo_title VARCHAR(200),
    ADD COLUMN seo_description VARCHAR(500);

ALTER TABLE skills
    ADD COLUMN icon VARCHAR(100),
    ADD COLUMN years_experience INT NOT NULL DEFAULT 0;

ALTER TABLE experiences
    ADD COLUMN role_fr VARCHAR(150),
    ADD COLUMN description_fr TEXT,
    ADD COLUMN achievements TEXT,
    ADD COLUMN achievements_fr TEXT;

ALTER TABLE projects
    ADD COLUMN summary_fr VARCHAR(500),
    ADD COLUMN description_fr TEXT,
    ADD COLUMN category VARCHAR(100),
    ADD COLUMN screenshots TEXT;

ALTER TABLE articles
    ADD COLUMN title_fr VARCHAR(200),
    ADD COLUMN excerpt_fr VARCHAR(500),
    ADD COLUMN content_html_fr TEXT,
    ADD COLUMN category VARCHAR(100),
    ADD COLUMN tags VARCHAR(300),
    ADD COLUMN featured BOOLEAN NOT NULL DEFAULT false;
