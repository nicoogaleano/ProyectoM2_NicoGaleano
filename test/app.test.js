const request = require('supertest');
const app = require('../src/app'); // Ajustá la ruta según la ubicación de tu app.js
const pool = require('../src/config/db'); // Instancia de conexión a la base de datos

afterAll(async () => {
  // Cerramos la conexión a la DB al finalizar los tests
  await pool.end();
});

describe('Testing de API REST - Autores y Posts', () => {

  // TEST 1: Éxito al obtener todos los autores (GET /authors)
  test('1. GET /authors debe retornar un status 200 y una lista de autores', async () => {
    const response = await request(app).get('/authors');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // TEST 2: Éxito al crear un autor (POST /authors)
  test('2. POST /authors debe crear un autor exitosamente y retornar status 201', async () => {
    const randomEmail = `test.${Date.now()}@example.com`;
    const response = await request(app)
      .post('/authors')
      .send({
        name: 'Autor Test',
        email: randomEmail,
        bio: 'Biografía de prueba para testing'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(randomEmail);
  });

 // TEST 3: Caso de error por email duplicado
test('3. POST /authors debe retornar status 409 cuando se intenta registrar un email duplicado', async () => {
  const emailPrueba = `duplicado.${Date.now()}@example.com`;

  // 1. Primero creamos el autor por primera vez (debe dar 201)
  await request(app)
    .post('/authors')
    .send({ name: 'Autor Base', email: emailPrueba, bio: 'Test' });

  // 2. Intentamos crearlo de nuevo con EL MISMO email (debe dar 409)
  const response = await request(app)
    .post('/authors')
    .send({ name: 'Autor Repetido', email: emailPrueba, bio: 'Test' });

  expect(response.statusCode).toBe(409);
  expect(response.body).toHaveProperty('error');
});


  // TEST 4: Caso de error al buscar autor inexistente (GET /authors/:id)
  test('4. GET /authors/:id debe retornar status 404 si el ID no existe', async () => {
    const response = await request(app).get('/authors/999999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  // TEST 5: Éxito al obtener todos los posts (GET /posts)
  test('5. GET /posts debe retornar un status 200 y una lista de publicaciones', async () => {
    const response = await request(app).get('/posts');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // TEST 6: Caso de error al buscar post inexistente (GET /posts/:id)
  test('6. GET /posts/:id debe retornar status 404 si el post no existe', async () => {
    const response = await request(app).get('/posts/999999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

});