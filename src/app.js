const express = require('express');
const authorsRoutes = require('./routes/authorsRoutes.js');
const postsRoutes = require('./routes/postsRoutes.js');

const app = express();
app.use(express.json());

// Habilitar CORS para todas las solicitudes
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Middleware para validar el tipo de dato
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Cargar el archivo .yaml
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

// Servir la documentación en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Declaración de rutas
app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error interno en el servidor' });
});

module.exports = app;