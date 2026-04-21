🚀 MiniBlog API

API REST desarrollada en Node.js + Express conectada a PostgreSQL para gestionar authors, posts y comments.

Este proyecto forma parte de un backend básico diseñado para servir como base a futuras aplicaciones frontend, sistemas de recomendación y autenticación.

📌 Características
CRUD completo de authors
CRUD completo de posts
CRUD básico de comments
Relación 1 → authors → posts → comments
Validaciones y manejo de errores
Base de datos PostgreSQL
Tests automatizados con Jest + Supertest
Arquitectura modular (routes, services, db, middlewares)
🧱 Tecnologías
Node.js
Express
PostgreSQL
pg (node-postgres)
Jest
Supertest
dotenv
📂 Estructura del proyecto
src/
 ├── db/
 │   └── db.js
 ├── routes/
 │   ├── authors-routes.js
 │   ├── posts-routes.js
 │   └── comments-routes.js
 ├── services/
 │   ├── authors-service.js
 │   ├── posts-service.js
 │   └── comments-service.js
 ├── middlewares/
 │   └── error-handler.js
 ├── index.js
 └── server.js

tests/
 ├── authors.test.js
 ├── comments.test.js
 └── jest.setup.js

setup.sql
.env.example
package.json
⚙️ Instalación
1. Clonar repositorio
git clone <TU_REPO_URL>
cd miniblog-api
2. Instalar dependencias
npm install
🔐 Variables de entorno

Crear archivo .env basado en .env.example:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=miniblog
DB_PASSWORD=tu_password
DB_PORT=5432
PORT=3000
🗄️ Configuración de la base de datos
1. Crear base de datos
CREATE DATABASE miniblog;
2. Ejecutar script SQL

Desde terminal:

psql -U postgres -d miniblog

Luego:

\i ruta/al/setup.sql

Esto creará:

tablas
relaciones
datos iniciales (seed)
▶️ Ejecutar el proyecto
npm run dev

Servidor disponible en:

http://localhost:3000
🧪 Ejecutar tests
npm test

✔ Tests cubren:

creación de author
validaciones
obtención de datos
creación de comments
errores
📡 Endpoints
👤 Authors
Método	Endpoint	Descripción
GET	/authors	Listar authors
GET	/authors/	Obtener author
POST	/authors	Crear author
PUT	/authors/	Actualizar author
DELETE	/authors/	Eliminar author
📝 Posts
Método	Endpoint	Descripción
GET	/posts	Listar posts
GET	/posts/	Obtener post
GET	/posts/author/	Posts por author
POST	/posts	Crear post
PUT	/posts/	Actualizar post
DELETE	/posts/	Eliminar post
💬 Comments
Método	Endpoint	Descripción
GET	/comments	Listar comments
GET	/comments/	Obtener comment
GET	/comments/post/	Comments por post
POST	/comments	Crear comment
DELETE	/comments/	Eliminar comment
⚠️ Validaciones
name obligatorio en authors
email único
title, content, author_id obligatorios en posts
content, author_id, post_id obligatorios en comments
❌ Manejo de errores
400 → datos inválidos
404 → recurso no encontrado
500 → error interno

Middleware centralizado en:

middlewares/error-handler.js
🚀 Deployment (Railway)
1. Crear cuenta en Railway

https://railway.app

2. Crear nuevo proyecto
Deploy desde GitHub
Seleccionar repositorio
3. Configurar variables de entorno

En Railway agregar:

DB_USER
DB_HOST
DB_NAME
DB_PASSWORD
DB_PORT
PORT
4. Ejecutar script SQL en Railway DB

Usar el mismo setup.sql

📄 OpenAPI

Puedes documentar la API usando Swagger/OpenAPI
(opcional según implementación)

🤖 Uso de Inteligencia Artificial

Durante el desarrollo se utilizó IA para:

Resolución de errores en Jest y configuración ESM
Corrección de arquitectura (separación app/server)
Mejora de estructura del proyecto
Generación de documentación (README)

La IA fue utilizada como herramienta de apoyo, validando manualmente cada solución implementada.

👨‍💻 Autor

Emanuel Flórez

📌 Estado del proyecto

✔ Funcional
✔ Tests pasando
✔ Listo para deploy
✔ Cumple requisitos del proyecto integrador

🔥 Notas finales

Este proyecto demuestra:

Manejo de APIs REST
Integración con bases de datos relacionales
Testing backend
Buenas prácticas de desarrollo