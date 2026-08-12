// src/services/authors.service.js

let authors = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana@example.com',
    bio: 'Desarrolladora full-stack apasionada por Node.js',
    created_at: new Date()
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    email: 'carlos@example.com',
    bio: 'Escritor técnico especializado en bases de datos',
    created_at: new Date()
  },
  {
    id: 3,
    name: 'María López',
    email: 'maria@example.com',
    bio: 'Ingeniera de software con foco en APIs REST',
    created_at: new Date()
  }
];

let nextId = 4;

// src/services/authors.service.js
const pool = require('../config/db');

const getAllAuthors = async () => {
  const query = 'SELECT * FROM authors ORDER BY id ASC;';
  const { rows } = await pool.query(query);
  return rows;
};

const getAuthorById = async (id) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0]; // Retorna el autor o undefined si no existe
};

// src/services/authors.service.js
const createAuthor = async (data) => {
  const { name, email, bio } = data;
  const query = `
    INSERT INTO authors (name, email, bio)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  // Si la query falla por unicidad, pool.query arroja una excepción automáticamente
  const { rows } = await pool.query(query, [name, email, bio || null]);
  return rows[0];
};

const updateAuthor = async (id, data) => {
  const { name, email, bio } = data;
  
  // Usamos COALESCE para actualizar solo los valores que se envíen
  const query = `
    UPDATE authors
    SET 
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      bio = COALESCE($3, bio)
    WHERE id = $4
    RETURNING *;
  `;
  
  const { rows } = await pool.query(query, [name, email, bio, id]);
  return rows[0] || null;
};

const deleteAuthor = async (id) => {
  const query = 'DELETE FROM authors WHERE id = $1 RETURNING id;';
  const { rows } = await pool.query(query, [id]);
  return rows.length > 0;
};

module.exports = {
  getAllAuthors, 
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};