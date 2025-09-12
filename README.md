#Vivero El Ceibo

**E-commerce para un vivero familiar con más de 45 años de trayectoria.**  
Este proyecto busca digitalizar la venta de productos de jardinería, facilitando la gestión interna y la experiencia de compra del cliente.

---

## 🛠️ Tecnologías utilizadas

### Frontend:
- React
- Axios
- React Router

### Backend:
- Node.js
- Express
- Sequelize
- MySQL

### Autenticación:
- JWT (tokens)
- Cookies para el manejo de sesión

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone [URL_DEL_REPO]
cd vivero-el-ceibo

Instalar dependencias

npm install

Configuracion de entorno
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DIALECT=mysql

JWT_SECRET=
JWT_REFRESH_SECRET=
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Base de datos

Crear una base de datos llamada vivero_db (o el nombre que pongas en DB_NAME)

Ejecutar migraciones y seeders (si están disponibles)

El proyecto incluye un seeder para crear un usuario administrador

Para correr proyecto front y back
npm run dev

Seeder incluido

Se incluye un seeder para crear un usuario administrador. Esto permite acceder al panel de administración desde el inicio.

Funcionalidades actuales

Login de administrador con JWT y cookies

CRUD de administradores de gestion de usuarios productos y categorias

Sistema de roles (admin / cliente)

Rutas protegidas con middleware
Autenticación

JWT para acceso seguro

Cookies HTTP-only para mantener la sesión

Rutas privadas para administración


📁 backend/
   ├── controllers/
   ├── models/
   ├── routes/
   ├── middlewares/
   └── config/

📁 frontend/
   ├── components/
   ├── pages/
   ├── context/
   └── services/


🚧 Estado del proyecto

🟡 En desarrollo

Actualmente funcionando:

Inicio de sesión (admin)

CRUD de administradores

Panel administrativo básico

Próximamente:

Registro y login de clientes


Carrito de compras

Checkout y pagos

Página pública con filtros


















#Trabajo práctico de desarrollo web 2
Crear un sitio web diseñado con Material UI,tailwind css sin funcionalidades, la temática de este sitio es de un vivero llamado el Ceibo.

para los iconos utilizo lucide,porque es mas liviana y sencilla de aplicar.
https://recharts.org/en-US p/ los graficos