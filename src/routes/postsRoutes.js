const { Router } = require('express');
const postsController = require('../controllers/postsController.js');
const { validatePost } = require('../middlewares/validators.js');

const router = Router();

router.get('/', postsController.getPosts);
router.get('/author/:authorId', postsController.getPostsByAuthor);
router.get('/:id', postsController.getPostById);

// Aplicamos validatePost en POST
router.post('/', validatePost, postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;
