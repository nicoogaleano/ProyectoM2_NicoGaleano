# API REST - Gestión de Autores y Publicaciones (M2 Project)

## Descripción del Proyecto
Esta API REST permite administrar **Autores** y **Publicaciones (Posts)** implementando Node.js, Express, PostgreSQL para el almacenamiento persistente, Jest y Supertest para pruebas automatizadas, y Swagger (OpenAPI) para la documentación interactiva.

---

## Requisitos Previos
- Node.js (v18+)
- PostgreSQL (v14+)
- Git

---

## Pasos para Ejecutar Localmente

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone <URL_DE_TU_REPOSITORIO_GITHUB>
cd <NOMBRE_DE_TU_REPOSITORIO>
npm install
```

### 2. Configurar la Base de Datos Local
1. Creá una base de datos en PostgreSQL llamada `m2_db` (o el nombre que prefieras).
2. Ejecutá el script de creación de tablas:
   ```bash
   psql -U postgres -d m2_db -f setup.sql
   ```
3. Carga los datos de prueba iniciales (seed):
   ```bash
   psql -U postgres -d m2_db -f seed.sql
   ```

### 3. Configurar Variables de Entorno
Copiá el archivo de ejemplo `.env.example` y creá tu archivo `.env`:
```bash
cp .env.example .env
```
Completá los datos de conexión correspondientes en el `.env`.

### 4. Iniciar la aplicación
- **Modo Desarrollo:**
  ```bash
  npm run dev
  ```
- **Modo Producción / Inicio Estándar:**
  ```bash
  npm start
  ```

---

## Pruebas Unitarias (Tests)
El proyecto cuenta con una suite de pruebas de integración y unitarias que validan el comportamiento de las rutas de Autores y Posts (respuestas HTTP, códigos de estado 200, 201, 404, 409, etc.).

Para ejecutar los tests, corré:
```bash
npm test
```

---

## Documentación OpenAPI (Swagger UI)
La documentación e interfaz interactiva para probar los endpoints se encuentra disponible en la siguiente ruta al iniciar el servidor localmente:

- **Local:** `http://localhost:3000/api-docs`

---

## Guía de Deployment en Railway

1. **Creación del Proyecto:**
   - Conectá tu cuenta de GitHub en [Railway.app](https://railway.app/).
   - Seleccioná `New Project` > `Deploy from GitHub repo` y elegí este repositorio.

2. **Añadir Base de Datos PostgreSQL:**
   - En el Dashboard de Railway, seleccioná `+ New` > `Database` > `Add PostgreSQL`.
   - En la pestaña **Data**, ejecutá los contenidos de `setup.sql` y `seed.sql`.

3. **Variables de Entorno en Railway (`Variables` tab):**
   Cargá las siguientes variables en la sección de configuración de tu Web Service en Railway:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT`
   - `PORT` (Railway asigna uno dinámicamente si no lo fijas)

4. **URLs del Proyecto en Railway:**
   - **Internal URL:** `http://postgres.railway.internal:5432` (para comunicación entre servicios en la red privada de Railway).
   - **Public URL:** Generada desde **Settings** > **Networking** > **Generate Domain**.
   - **Swagger de Producción:** `<PUBLIC_URL>/api-docs`

---

## Registro del Uso de Inteligencia Artificial (AI)

Durante el desarrollo del proyecto se utilizó asistencia de Inteligencia Artificial para:
- Resolución y depuración de errores durante la ejecución de la suite de tests con Jest/Supertest (*debugging* de *syntax errors* y referencias no definidas).
- Optimización y estructuración de la documentación Swagger UI / OpenAPI 3.0.
- Estructuración del plan de despliegue de PostgreSQL y variables de entorno en la plataforma Railway.