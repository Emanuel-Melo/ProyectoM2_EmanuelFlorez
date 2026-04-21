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
└── server.js

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
