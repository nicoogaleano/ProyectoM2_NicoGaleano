const authorsService = require('../services/authorsService');

const getAuthors = async (req, res) => {
  try {
    const authors = await authorsService.getAllAuthors();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los autores' });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await authorsService.getAuthorById(id);

    // Si la DB no encontró el registro:
    if (!author) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// src/controllers/authors.controller.js
const createAuthor = async (req, res) => {
  try {
    const newAuthor = await authorsService.createAuthor(req.body);
    return res.status(201).json(newAuthor);
  } catch (error) {
    console.error("Error capturado en createAuthor:", error.code, error.message);

    // 23505 es el código estándar de PostgreSQL para 'unique_violation'
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El email ingresado ya se encuentra registrado' });
    }

    return res.status(500).json({ error: 'Error interno del servidor al crear el autor' });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAuthor = await authorsService.updateAuthor(id, req.body);
    
    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El email ingresado ya está en uso' });
    }
    return res.status(500).json({ error: 'Error al actualizar el autor' });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await authorsService.deleteAuthor(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el autor' });
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};