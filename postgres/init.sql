CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO students (name)
VALUES ('Santino'), ('Tomás'), ('Vladimir');
