const { Router } = require('express');
const postsController = require('../controllers/postsController.js');
const { validatePost } = require('../middlewares/validators.js');

const router = Router();

router.get('/', postsController.getPosts);
router.get('/author/:authorId', postsController.getPostsByAuthor);
router.get('/:id', postsController.getPost);

router.post('/', validatePost, postsController.createNewPost);
router.put('/:id', postsController.updateExistingPost);
router.delete('/:id', postsController.deleteExistingPost);

module.exports = router;