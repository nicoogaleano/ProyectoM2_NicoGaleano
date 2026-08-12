let posts = [
  {
    id: 1,
    title: 'Introducción a Node.js',
    content: 'Node.js es un runtime de JavaScript...',
    author_id: 1,
    published: true,
    created_at: new Date()
  },
  {
    id: 2,
    title: 'PostgreSQL vs MySQL',
    content: 'Ambas bases de datos tienen ventajas...',
    author_id: 2,
    published: true,
    created_at: new Date()
  },
  {
    id: 3,
    title: 'APIs RESTful',
    content: 'REST es un estilo arquitectónico...',
    author_id: 1,
    published: true,
    created_at: new Date()
  },
  {
    id: 4,
    title: 'Manejo de errores en Express',
    content: 'El manejo apropiado de errores...',
    author_id: 3,
    published: false,
    created_at: new Date()
  },
  {
    id: 5,
    title: 'Async/Await explicado',
    content: 'Las promesas simplifican el código asíncrono...',
    author_id: 3,
    published: false,
    created_at: new Date()
  }
];

let nextId = 6;

// src/services/authors.service.js
const pool = require('../config/db');


const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM posts');
  return result.rows; // Retorna el array de publicaciones
};


const getAllAuthors = async () => {
  const query = 'SELECT * FROM authors ORDER BY id ASC;';
  const { rows } = await pool.query(query);
  return rows;
};

const getAuthorById = async (id) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0];
};

const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0]; // Retorna undefined si el ID no existe en la DB
};

const getPostsByAuthor = async (authorId) => {
  const result = await pool.query('SELECT * FROM posts WHERE author_id = $1', [authorId]);
  return result.rows;
};

const createAuthor = async (data) => {
  const { name, email, bio } = data;
  const query = `
    INSERT INTO authors (name, email, bio)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
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

// src/services/postsService.js
module.exports = {
 getAllPosts,
  getPostById,
  getPostsByAuthor,
};