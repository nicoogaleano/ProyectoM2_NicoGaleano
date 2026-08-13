const postsService = require('../services/postsService.js');

const getPosts = async (req, res) => {
  try {
    const posts = await postsService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsService.getPostById(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

const createNewPost = async (req, res) => {
  try {
    const newPost = await postsService.createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

const updateExistingPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await postsService.updatePost(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};

const deleteExistingPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await postsService.deletePost(id);
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
    
    // Responde status 204 sin cuerpo
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const posts = await postsService.getPostsByAuthorId(authorId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener posts del autor' });
  }
};

module.exports = {
  getPosts,
  getPost,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
  getPostsByAuthor
};