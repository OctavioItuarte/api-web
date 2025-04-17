#Servidor Web para plataformas ecommerce

Se optó por desarrollar una aplicacion backend, construida con ExpressJS, para la comunicacion y persistencia de datos en la plataforma ecommerce.
El proyecto brinda servicios de login, signup, chequeo de roles de usuario, almacenamiento de imagenes y operaciones CRUD sobre usuarios y productos.
Para la persistencia de datos de usuarios, productos y sesiones se eligio **MongoDB**, cuyas estructuras de datos se definen utilizando **mongoose**.

##Pre requisitos
Contar con una base de datos MongoDB, cuya URL debe incluirse en los archivos *app.js* y *bin/www.js*.
Como opciones, se utilizo una cuenta en MongoDBAtlas y un contenedor (docker) con una imagene de mongo.

Instalar ultima version de npm

##Guia de instalacion y ejecucion

Primero ejecutar

    git clone https://github.com/OctavioItuarte/api-web.git

Para instalar las dependencias, desde consola navega dentro de la carpeta principal y ejecuta

    npm install

Para iniciar el servidor ejecutar:

    npm start

Corre por defecto en el puerto 3000 o el definido en la variable de entorno "PORT".

##Endpoints
http://localhost:3000

|**Metodo  |URL                         |Datos que recibe en el req.body                 |Datos que envia         |Errores**     |
|----------|----------------------------|------------------------------------------------|------------------------|--------------|
|POST      |/login/password             |{username, password}                            |                        |              |
|POST      |/signup/client              |"atributos definidos en models/userModel.js"    |                        |              |
|POST      |/signup/business            |"atributos definidos en models/userModel.js"    |                        |              |
|GET       |/products/{idBusiness}      |                                                |                        |              |
|POST      |/products                   |"atributos en models/productModel.js"           |                        |              |
