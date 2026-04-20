CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- Seed authors
INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Desarrolladora full-stack'),
('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico'),
('María López', 'maria@example.com', 'Ingeniera de software');

-- Seed posts
INSERT INTO posts (title, content, author_id, published) VALUES
('Intro a Node', 'Node.js es...', 1, true),
('PostgreSQL vs MySQL', 'Comparación...', 2, true),
('APIs REST', 'REST explicado...', 1, true);