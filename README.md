
# 🧩 Test Posts App — NestJS Backend + React Frontend

Este proyecto es una red social minimalista con funcionalidades básicas como creación de publicaciones, likes y perfiles de usuario. Está construido usando **NestJS** para el backend y **React con TypeScript** para el frontend.

---

## 📁 Estructura del Proyecto

```
.
├── backend/              # Microservicios NestJS
│   ├── users-service/
│   └── posts-service/
├── client/               # Frontend React
├── docker-compose.yml    # Orquestación de servicios backend
└── README.md
```

---

## 🚀 Requisitos Previos

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) ≥ 16.x (solo para el frontend)

---

## 🐳 Levantar el Backend (NestJS)

El backend está compuesto por dos microservicios:
- `users-service`: Gestión de usuarios y autenticación.
- `posts-service`: Gestión de publicaciones y likes.

Usamos Docker para levantar toda la infraestructura del backend:

```bash
docker-compose up --build
```

Esto iniciará:
- Microservicio de usuarios (puerto `3000`)
- Microservicio de posts (puerto `3001`)
- Base de datos PostgreSQL (puerto `5432`)

> Asegúrate de que los puertos no estén en uso y de tener configurados los archivos `.env` en cada microservicio si son requeridos.

---

## 🌐 Levantar el Frontend (React)

El frontend **no** usa Docker. Para ejecutarlo:

```bash
cd client-posts-app
npm install
npm run dev
```

Por defecto se abrirá en `http://localhost:5173`.

---

## 📦 Variables de Entorno (ejemplo para backend)

Para cada microservicio NestJS (`users-service`, `posts-service`), puedes incluir un `.env` similar al siguiente:
(Se envían arcivos .env en cada microservicio)



```env
PORT=3001
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=app
JWT_SECRET=your_secret
```

---

## 🧪 Funcionalidades

✅ Registro e inicio de sesión  
✅ Publicación de mensajes.
✅ Likes en publicaciones  
✅ Scroll automático
✅ Navbar dinámica  
✅ Validaciones y manejo de errores amigables  

---

## 🛠 Tecnologías

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: NestJS + TypeORM + PostgreSQL + JWT
- **Contenerización**: Docker + Docker Compose

---

## 📝 Comandos útiles

```bash
# Iniciar todos los servicios backend
docker-compose up --build

# Iniciar solo frontend (React)
cd client-posts-app
npm install
npm run dev
```

---

## ✍️ Autor

Desarrollado por [Daniel Farfán](https://github.com/PythDani)

---


