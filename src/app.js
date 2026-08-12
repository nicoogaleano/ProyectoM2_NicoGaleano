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


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API MiniBlog</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #0d1117;
          color: #c9d1d9;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .card {
          background-color: #161b22;
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 2.5rem;
          max-width: 420px;
          width: 90%;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        .status-badge {
          display: inline-block;
          background-color: rgba(46, 160, 67, 0.15);
          color: #3fb950;
          border: 1px solid rgba(46, 160, 67, 0.4);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
        h1 {
          font-size: 1.75rem;
          color: #f0f6fc;
          margin-bottom: 0.75rem;
        }
        p {
          color: #8b949e;
          font-size: 0.95rem;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }
        .btn {
          display: inline-block;
          background-color: #238636;
          color: #ffffff;
          text-decoration: none;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }
        .btn:hover {
          background-color: #2ea043;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="status-badge">● Online</span>
        <h1>API MiniBlog Nico Galeano</h1>
        <p>El backend se encuentra activo y listo para procesar peticiones.</p>
        <a href="https://m2-proyecto-api-production.up.railway.app/api-docs" class="btn">Ver documentación en Swagger</a>
      </div>
    </body>
    </html>
  `);
});

module.exports = app;