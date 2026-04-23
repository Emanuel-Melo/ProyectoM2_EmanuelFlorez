# 🚀 Miniblog API

API REST desarrollada con **Node.js + Express + PostgreSQL** para gestionar autores, posts y comentarios.  
Este proyecto simula el backend inicial de un sistema tipo blog, permitiendo operaciones CRUD completas y sirviendo como base para futuras integraciones con frontend y otras aplicaciones.

---

## 📌 Descripción

La API permite:

- Gestionar autores (authors)
- Gestionar publicaciones (posts)
- Gestionar comentarios (comments)
- Persistir datos en PostgreSQL
- Validar datos y manejar errores correctamente
- Ejecutar tests automatizados
- Documentar endpoints para integración

---

## 🧱 Tecnologías utilizadas

| Tecnología | Uso |
|----------|------|
| Node.js | Entorno de ejecución |
| Express | Framework backend |
| PostgreSQL | Base de datos relacional |
| pg | Cliente PostgreSQL |
| dotenv | Variables de entorno |
| Jest | Testing |
| Supertest | Testing de endpoints HTTP |
| Nodemon | Desarrollo |

---

## 📂 Estructura del proyecto

📁 src
- ├── 📁 db
- │ ├── db.js
- │ └── setup.sql
- ├── 📁 routes
- │ ├── authors-routes.js
- │ ├── posts-routes.js
- │ └── comments-routes.js
- ├── 📁 services
- │ ├── authors-service.js
- │ ├── posts-service.js
- │ └── comments-service.js
- ├── 📁 middlewares
- │ └── error-handler.js
- ├── index.js
- └── server.js

- 📁 tests
- ├── authors.test.js
- └── comments.test.js

- 📄 package.json
- 📄 .env.example
- 📄 README.md


---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone <TU_REPO_URL>
cd miniblog-api
````

### 2. Instalar dependencias

````bash
npm install
````

### 3. Configurar variables de entorno

Crear un archivo .env basado en .env.example:

````env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=miniblog
DB_PASSWORD=tu_password
DB_PORT=5432
PORT=3000
````
---
##🗄️ Configuración de la base de datos

### 1. Crear base de datos en PostgreSQL

````SQL
CREATE DATABASE miniblog;
````

### Ejecutar script SQL
Desde la terminal de PostgreSQL:

````SQL
\c miniblog
\i ruta/a/setup.sql
````
Ejemplo con Windows:
````SQL
\i C:/Users/TU_USUARIO/.../setup.sql
````

### ▶️ Ejecutar la aplicación

````bash
npm run dev
````

Servidor disponible en:
````
http://localhost:3000
````

---

## 📡 Endpoints disponibles

### 👤 Authors

| Método | Endpoint     | Descripción      |
| ------ | ------------ | ---------------- |
| GET    | /authors     | Listar autores   |
| GET    | /authors/:id | Obtener autor    |
| POST   | /authors     | Crear autor      |
| PUT    | /authors/:id | Actualizar autor |
| DELETE | /authors/:id | Eliminar autor   |

---

### 📝 Posts

| Método | Endpoint                | Descripción     |
| ------ | ----------------------- | --------------- |
| GET    | /posts                  | Listar posts    |
| GET    | /posts/:id              | Obtener post    |
| GET    | /posts/author/:authorId | Posts por autor |
| POST   | /posts                  | Crear post      |
| PUT    | /posts/:id              | Actualizar post |
| DELETE | /posts/:id              | Eliminar post   |

---

### 💬 Comments

| Método | Endpoint               | Descripción          |
| ------ | ---------------------- | -------------------- |
| GET    | /comments              | Listar comentarios   |
| GET    | /comments/:id          | Obtener comentario   |
| GET    | /comments/post/:postId | Comentarios por post |
| POST   | /comments              | Crear comentario     |
| DELETE | /comments/:id          | Eliminar comentario  |

---

## 📡 Ejemplo de uso

### Crear author

POST /authors
````json
Body:

{
  "name": "Juan",
  "email": "juan@test.com",
  "bio": "dev junior"
}
````
Respuesta:
````json
{
  "id": 1,
  "name": "Juan",
  "email": "juan@test.com",
  "bio": "dev junior",
  "created_at": "2026-04-22T16:07:06.553Z"
}
````

---

## ✅ Validaciones implementadas

- name obligatorio en authors.
- email único en authors.
- title, content, author_id obligatorios en posts.
- content, author_id, post_id obligatorios en comments.
- Verificación de existencia de author y post.
- Manejo de errores con códigos HTTP correctos.

---

## 🧪 Testing

Ejecutar tests:

````bash
npm test
````

Cobertura:
- Crear author.
- Obtener authors.
- Validaciones de error.
- Crear comentario.
- Eliminar comentario.
- Consultas por relaciones.

---

## 🛡️ Manejo de errores

Middleware global que captura errores y responde con: 
| Código | Descripción           |
| ------ | --------------------- |
| 400    | Bad Request           |
| 404    | Not Found             |
| 500    | Internal Server Error |

---

## 🚀 Deployment (Railway)

Pasos:

1. Crear cuenta en Railway
2. Crear nuevo proyecto
3. Conectar repositorio de GitHub
4. Añadir servicio de PostgreSQL
5. Obtener DATABASE_URL desde PostgreSQL (Connect → Public Network)
6. Configurar variable en el backend:

DATABASE_URL=<connection_string>

7. Deploy automático

### Variables usadas en producción

- DATABASE_URL → conexión a PostgreSQL
- PORT → asignado automáticamente por Railway

---

## 🔐 Variables de entorno

### Entorno local (.env)

DB_USER=postgres
DB_HOST=localhost
DB_NAME=miniblog
DB_PASSWORD=tu_password
DB_PORT=5432
PORT=3000

### Entorno Railway

En producción se utiliza:

DATABASE_URL=postgresql://user:password@host:port/database

PORT es asignado automáticamente por Railway.

---

## 🔐 Buenas prácticas aplicadas

- Uso de variables de entorno (.env)
- No se suben credenciales al repositorio
- Queries SQL parametrizadas (prevención SQL Injection)
- Separación de responsabilidades (routes/services)
- Manejo centralizado de errores
- Tests automatizados

---

## 📦 Estado del proyecto

✅ API funcional
✅ Base de datos conectada
✅ Tests pasando
✅ Validaciones implementadas
✅ Documentación completa

---

## 📚 Documentación API (OpenAPI)

Puedes visualizar la documentación usando Swagger Editor:

1. Ir a https://editor.swagger.io/
2. Copiar el contenido de `openapi.yaml`
3. Pegar en el editor

O usar Swagger UI local.

--- 

## 🌐 API en producción

Base URL:
````https://proyectom2emanuelflorez-production.up.railway.app/````

Endpoints de prueba:
````
GET /authors  
https://proyectom2emanuelflorez-production.up.railway.app/authors
````
````
GET /posts  
https://proyectom2emanuelflorez-production.up.railway.app/posts
````

---

## 🤖 Uso de IA

Se utilizó ChatGPT como apoyo durante el desarrollo del proyecto para:

- Funcionamiento del comando ````npm run dev````
- Correctos test con supertest en terminal a partir de comando ````npm test````
- Deployment en Railway
- Mejora de estructura del proyecto

El uso de IA fue complementario y todas las decisiones fueron comprendidas, implementadas y validadas manualmente.

*Para visualizar las evidencias fotográficas del proceso con Chat GPT, entrar a la carpeta de "Capturas evidencias chat gpt", ahí logrará visualizar el proceso detallado por medio de capturas de pantalla.

---

## 👨‍💻 Autor

Emanuel Flórez
Proyecto académico - Backend Developer Junior 🚀
