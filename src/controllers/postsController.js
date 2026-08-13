import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByAuthorId
} from '../services/postsService.js';

// GET /posts
export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

// GET /posts/:id
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

// POST /posts
export const createNewPost = async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

// PUT /posts/:id
export const updateExistingPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updatePost(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el post' });
  }
};

// DELETE /posts/:id
export const deleteExistingPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deletePost(id);
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ message: 'Post eliminado correctamente', post: deleted });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};

// GET /posts/author/:authorId
export const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const posts = await getPostsByAuthorId(authorId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener posts del autor' });
  }
};
