# Servidor Web para plataformas ecommerce

Se optó por desarrollar una aplicacion backend, construida con ExpressJS, para la comunicacion y persistencia de datos en la plataforma ecommerce.
El proyecto brinda servicios de login, signup, chequeo de roles de usuario, almacenamiento de imagenes y operaciones CRUD sobre usuarios y productos.
Para la persistencia de datos de usuarios, productos y sesiones se eligio **MongoDB**, cuyas estructuras de datos se definen utilizando **mongoose**.

## Pre requisitos
Contar con una base de datos MongoDB, cuya URL debe incluirse en los archivos *app.js* y *bin/www.js*.

Tener instalado git y npm

## Guia de instalacion y ejecucion

Para clonar el repositorio en tu maquina

    git clone https://github.com/OctavioItuarte/api-web.git

Para instalar las dependencias, desde consola navega dentro de la carpeta principal y ejecuta

    npm install

Para iniciar el servidor ejecutar

    npm start

Corre por defecto en el puerto 3000 o el definido en la variable de entorno "PORT".

---

## 📦 Dependencias Backend

Estas son las principales dependencias utilizadas en el backend desarrollado con **Express.js**:

| Paquete            | Versión       | Descripción                                                  |
|--------------------|---------------|--------------------------------------------------------------|
| **express**        | ^4.21.2       | Framework web principal para el backend                      |
| **mongoose**       | ^8.4.1        | ORM para MongoDB                                             |
| **passport**       | ^0.7.0        | Autenticación de usuarios                                    |
| **passport-local** | ^1.0.0        | Estrategia local de autenticación                            |
| **express-session**| ^1.18.1       | Manejo de sesiones                                           |
| **connect-mongo**  | ^5.1.0        | Almacenamiento de sesiones en MongoDB                        |
| **multer**         | ^1.4.5-lts.2  | Middleware para manejo de archivos (uploads)                 |
| **cookie-parser**  | ~1.4.4        | Parseo de cookies                                            |
| **cors**           | ^2.8.5        | Middleware para habilitar CORS                               |
| **morgan**         | ~1.9.1        | Logger de peticiones HTTP                                    |
| **debug**          | ~2.6.9        | Herramienta para debuggeado con namespaces                   |
| **jade**           | ^1.9.2        | Motor de vistas (opcional, si se usa para respuestas HTML)   |
| **http-errors**    | ~1.6.3        | Generador de errores HTTP para manejo más limpio             |

---

## 🔐 Autenticación

> Algunas rutas requieren autorización mediante roles.  
> Las sesiones se mantienen mediante **cookies** y se almacenan en MongoDB usando `connect-mongo`.

### 🔄 Flujo de Autenticación

1. El usuario inicia sesión enviando sus credenciales (`email` y `password`) a `/login/password`.
2. Si las credenciales son válidas, se genera una **cookie de sesión**.
3. Las rutas protegidas validan esta sesión automáticamente en cada request.

---

## 📦 Endpoints

---

### 👥 Usuarios (solo admin)

| Método | Endpoint       | Descripción              |
|--------|----------------|--------------------------|
| POST   | `/users`       | Crear un nuevo usuario   |
| GET    | `/users`       | Obtener todos los clientes |
| PUT    | `/users/:id`   | Actualizar usuario por ID |
| DELETE | `/users/:id`   | Eliminar usuario por ID   |

---

### 🏪 Negocios

| Método | Endpoint       | Descripción                     |
|--------|----------------|----------------------------------|
| GET    | `/business`    | Listar negocios disponibles (todos los roles) |

---

### 🛒 Productos (solo business)

| Método | Endpoint                      | Descripción                        |
|--------|-------------------------------|------------------------------------|
| POST   | `/products`                   | Crear un producto *(con imagen)*  |
| GET    | `/products/:idBusiness`       | Obtener productos de un negocio (todos los usuarios tienen acceso)   |
| PUT    | `/products/:id`               | Actualizar un producto por ID     |
| DELETE | `/products/:id`               | Eliminar producto por ID          |
| DELETE | `/products`                   | Eliminar múltiples productos      |

> **Nota:** Envío de imagen se hace como `FormData` con campo `image`.

---

### 🔐 Auth y Registro

| Método | Endpoint             | Descripción                |
|--------|----------------------|----------------------------|
| POST   | `/login/password`    | Iniciar sesión con email y contraseña |
| POST   | `/signup/client`     | Registro de usuario cliente |
| POST   | `/signup/business`   | Registro de usuario negocio |

---

### 🧰 Utilidades

| Método | Endpoint                 | Descripción                    |
|--------|--------------------------|--------------------------------|
| GET    | `/existsuser/:email`     | Verifica si un usuario existe |

---

### 🧾 Sesiones

| Ruta base | `/session` |
|-----------|-------------|
| Verifica si hay una sesion activa |

---

## 📁 Formato de imagen (Multer)

Para endpoints que suben imágenes (`POST /products`):

- **Formato:** `multipart/form-data`
- **Campo esperado:** `image`
- **Respuesta:** URL accesible para usar en la app

---

## ⚠️ Códigos de Estado

| Código | Significado                  |
|--------|------------------------------|
| 200    | OK                           |
| 201    | Creado                       |
| 400    | Solicitud incorrecta         |
| 401    | No autorizado |
| 403    | Acceso denegado por rol      |
| 404    | No encontrado                 |
| 500    | Error interno del servidor   |

---

## 🧑‍💻 Autores

**Octavio Ituarte** – [@OctavioItuarte](https://github.com/OctavioItuarte)

**Julian Torrissi** – [@JulianTorrissi](https://github.com/JulianTorrissi)

---

