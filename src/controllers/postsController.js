const postsService = require('../services/postsService.js');
const authorsService = require('../services/authorsService.js');

const getPosts = async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsService.getPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /posts/author/:authorId - posts con detalle de su author
const getPostsByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    const author = await authorsService.getAuthorById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    const posts = await postsService.getPostsByAuthorId(authorId);

    return res.status(200).json({
      author,
      posts
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const newPost = await postsService.createPost(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPost = await postsService.updatePost(id, req.body);

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await postsService.deletePost(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};