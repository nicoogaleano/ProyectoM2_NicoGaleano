const validateAuthor = (req, res, next) => {
  const { name, email } = req.body;

  // Verificar que los campos requeridos estén presentes y no sean solo espacios en blanco
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'El campo "name" es obligatorio y no puede estar vacío' });
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ error: 'El campo "email" es obligatorio y no puede estar vacío' });
  }

  // Validación básica de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'El formato del "email" no es válido' });
  }

  // Sanitizado básico: quitamos espacios sobrantes en bordes
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};

const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'El campo "title" es obligatorio y no puede estar vacío' });
  }

  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ error: 'El campo "content" es obligatorio y no puede estar vacío' });
  }

  if (!author_id || isNaN(Number(author_id))) {
    return res.status(400).json({ error: 'El campo "author_id" es obligatorio y debe ser un número válido' });
  }

  req.body.title = title.trim();
  req.body.content = content.trim();
  req.body.author_id = Number(author_id);

  next();
};

module.exports = {
  validateAuthor,
  validatePost
};