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

const pool = require('../config/db.js'); // Verificá la ruta exacta a tu db.js

const getAllPosts = async () => {
  const query = 'SELECT * FROM posts ORDER BY id ASC';
  const { rows } = await pool.query(query);
  return rows;
};

const getPostById = async (id) => {
  const query = 'SELECT * FROM posts WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const createPost = async ({ title, content, author_id, published = false }) => {
  const query = `
    INSERT INTO posts (title, content, author_id, published)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [title, content, author_id, published];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updatePost = async (id, { title, content, published }) => {
  const query = `
    UPDATE posts
    SET title = $1, content = $2, published = $3
    WHERE id = $4
    RETURNING *
  `;
  const values = [title, content, published, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deletePost = async (id) => {
  const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const getPostsByAuthorId = async (authorId) => {
  const query = 'SELECT * FROM posts WHERE author_id = $1 ORDER BY id ASC';
  const { rows } = await pool.query(query, [authorId]);
  return rows;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByAuthorId
};