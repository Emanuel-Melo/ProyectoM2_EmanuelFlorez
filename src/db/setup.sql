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

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (author_id)
        REFERENCES authors(id)
        ON DELETE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
);

INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Desarrolladora full-stack'),
('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico'),
('María López', 'maria@example.com', 'Ingeniera de software');

INSERT INTO posts (title, content, author_id, published) VALUES
('Intro a Node', 'Node.js es...', 1, true),
('PostgreSQL vs MySQL', 'Comparación...', 2, true),
('APIs REST', 'REST explicado...', 1, true);

INSERT INTO comments (content, author_id, post_id) VALUES
('Muy buen post!', 1, 1),
('Interesante explicación', 2, 1),
('No entendí esta parte', 3, 2),
('Excelente contenido', 1, 3),
('Gracias por la info', 2, 3);