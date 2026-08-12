const { Router } = require('express');
const authorsController = require('../controllers/authorsController');
const { validateAuthor } = require('../middlewares/validators');

const router = Router();

router.get('/', authorsController.getAuthors);
router.get('/:id', authorsController.getAuthorById);

// Aplicamos validateAuthor en POST y opcionalmente en PUT
router.post('/', validateAuthor, authorsController.createAuthor);
router.put('/:id', validateAuthor, authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;

