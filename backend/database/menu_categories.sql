CREATE TABLE IF NOT EXISTS menu_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menu_categories (name)
VALUES
('Base'),
('Protein'),
('Soup'),
('Sides'),
('Drinks'),
('Extras');