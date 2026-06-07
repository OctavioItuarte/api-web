Desarrollo de API, construida con ExpressJS, para la comunicacion y persistencia de datos.
El proyecto brinda servicios de login, signup, chequeo de roles de usuario, almacenamiento de imagenes y operaciones CRUD sobre usuarios y productos.
La persistencia de datos de usuarios, productos y sesiones es **MongoDB** y **mongoose**.

## Pre requisitos
Contar con una base de datos MongoDB, cuya URL debe incluirse en los archivos *app.js* y *bin/www.js*.

Tener instalado git y npm

Para clonar el repositorio en tu maquina

    git clone https://github.com/OctavioItuarte/api-web.git
    npm install
En el directorio raiz, crear un archivo '.env' y agregarle las variables de entorno PORT, MONGO_URI y COOKIE_SECRET

    npm start
Corre por defecto en el puerto 3000 o el definido en la variable de entorno "PORT".

## Dependencias Backend

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
| **dotenv**         | ^16.5.0       | Cargar variables de entorno desde un archivo .env            |
| **debug**          | ~2.6.9        | Herramienta para debuggeado con namespaces                   |
| **jade**           | ^1.9.2        | Motor de vistas (opcional, si se usa para respuestas HTML)   |
| **http-errors**    | ~1.6.3        | Generador de errores HTTP para manejo más limpio             |

---
> Algunas rutas requieren autorización mediante roles.  
> Las sesiones se mantienen mediante **cookies** y se almacenan en MongoDB usando `connect-mongo`.

---
1. El usuario inicia sesión enviando sus credenciales (`email` y `password`) a `/login/password`.
2. Si las credenciales son válidas, se genera una **cookie de sesión**.
3. Las rutas protegidas validan esta sesión automáticamente en cada request.

## Endpoints

| Método | Endpoint       | Descripción              |
|--------|----------------|--------------------------|
| POST   | `/users`       | Crear un nuevo usuario (solo admin)  |
| GET    | `/users`       | Obtener todos los clientes (solo admin)|
| PUT    | `/users/:id`   | Actualizar usuario por ID (solo admin)|
| DELETE | `/users/:id`   | Eliminar usuario por ID (solo admin)  |
| GET    | `/business`    | Listar negocios disponibles (todos los roles) |
| POST   | `/products`                   | Crear un producto *(con imagen)*  |
| GET    | `/products/:idBusiness`       | Obtener productos de un negocio (todos los roles) |
| PUT    | `/products/:id`               | Actualizar un producto por ID     |
| DELETE | `/products/:id`               | Eliminar producto por ID          |
| DELETE | `/products`                   | Eliminar múltiples productos      |
| POST   | `/login/password`    | Iniciar sesión con email y contraseña |
| POST   | `/signup/client`     | Registro de usuario cliente |
| POST   | `/signup/business`   | Registro de usuario negocio |
| GET    | `/existsuser/:email`     | Verifica si un usuario existe |

| Ruta base | `/session` |
|-----------|-------------|
| Verifica si hay una sesion activa |

> **Nota:** Envío de imagen se hace como `FormData` con campo `image`.

## Formato de imagen (Multer)

Para endpoints que suben imágenes (`POST /products`):

- **Formato:** `multipart/form-data`
- **Campo esperado:** `image`
- **Respuesta:** URL accesible para usar en la app

## ⚠️ Códigos de Estado

| Código | Significado                  |
|--------|------------------------------|
| 200    | OK                           |
| 201    | Creado                       |
| 400    | Solicitud incorrecta         |
| 401    | No autorizado |
| 403    | Acceso denegado por rol      |
| 404    | No encontrado                 |
| 409    | Conflicto con el estado actual del recurso |
| 500    | Error interno del servidor   |
