# DOCUMENTACIÓN BAIT-API

## Introducción
Bienvenido a la documentación de la API de nuestro servicio. Esta API es utilizada para acceder y gestionar los datos de nuestra plataforma, incluyendo información sobre usuarios, publicaciones y comentarios.

## Autenticación
Para acceder a la API, es necesario autenticarse utilizando un token de autenticación válido. Este token se puede obtener mediante un proceso de autenticación de OAuth2. Para más información sobre el proceso de autenticación, consulte la documentación de nuestro servicio de autenticación.

## Usuarios
### GET /users
Este endpoint devuelve una lista de todos los usuarios en nuestro servicio.

#### Parámetros
Ninguno.

#### Respuestas
Devuelve un array de objetos "[]". La estructura del objeto es la siguiente:

```json
{
  "name": "nombre usuario",
  "lastname": "apellido usuario",
  "age": 24,
  "phone_number": "+323231102121",
  "email": "yanosoyelmismo@gmail.com",
  "location": "guayaquil"
}
Adicional a eso, se crea automáticamente una propiedad "isActive", que es utilizada para hacer el borrado lógico.

GET /users/:userId
Este endpoint devuelve el usuario mandado por params (user:id: number)

Parámetros
userId

Respuestas
Devuelve un usuario en específico teniendo en cuenta su id (único)

POST /users/
Este endpoint permite crear un nuevo usuario mandando la información por body.

Parámetros
BODY:

json
Copy code
{
  "name": "nombre",
  "lastname": "apellido",
  "age": 20,
  "phone_number": "+1234567890",
  "email": "ejemplo@gmail.com",
  "location": "ciudad"
}
Respuestas
json
Copy code
{
  "message": "User created correctly",
  "user": {
    "name": "nombre",
    "lastname": "apellido",
    "age": 20,
    "phone_number": "+1234567890",
    "email": "ejemplo@gmail.com",
    "location": "ciudad"
  }
}
DELETE /users/:userId
Este endpoint elimina un usuario.

Parámetros
userId

Respuestas
"Usuario eliminado": Borra un usuario definitivamente en específico de la base de datos.

PUT /users/:userId
Este endpoint actualiza la información de un usuario.

Parámetros
userId

Respuestas
"Usuario Actualizado Correctamente": Modifica el objeto existente en la base de datos con los datos que se le envían por body.

PUT /inactive/:userId
Este endpoint cambia el estado de un usuario a inactive (false), desactivando temporalmente el usuario en la base de datos, posteriormente se puede cambiar para volverlo a activar (Borrado Lógico).

Parámetros
userId

Respuestas
"Usuario desactivado correctamente".

Locals
GET /locals
Este endpoint devuelve una lista de todos los usuarios en nuestro servicio.

Parámetros
Ninguno.

Respuestas
Devuelve un objeto con la propiedad locals y success: { locals: [], success: true }. Locals es un array de objetos con la siguiente estructura:

json
Copy code
{
  "id": 1,
  "name": "Rodzini",
  "verified": "unVerified",
  "email": "email@gmail.com",
  "location": "Resistencia,Chaco,Microcentro",
  "schedule": "18:00 - 00:00",
  "createdAt": "2023-04-14T15:03:26.275Z",
  "updatedAt": "2023-04-14T15:03:26.275Z",
  "UserId": null,
  "Characteristic": {
    "wifi": false,
    "parking_lot": false,
    "outdoor_seating": false,
    "live_music": false,
    "table_service": false,
    "family_style": false,
    "romantic": false,
    "big_group": false,
    "work_friendly": false,
    "pet_friendly": false
},
"Menu": {
    "id": 1,
    "createdAt": "2023-04-14T15:16:09.183Z",
    "updatedAt": "2023-04-14T15:16:09.248Z",
    "LocalId": 1
},
"Reviews": []
}

POST /locals
This endpoint allows creating a new local by sending information in the request body.

Parameters
BODY:

{
    
  "name": STRING (required),
  "location": STRING (required),
  "schedule": STRING,
  "email": STRING,
  "characteristics": {
    "wifi": BOOLEAN,
    "parking_lot": BOOLEAN,
    "outdoor_seating": BOOLEAN,
    "live_music": BOOLEAN,
    "table_service": BOOLEAN,
    "family_style": BOOLEAN,
    "romantic": BOOLEAN,
    "big_group": BOOLEAN,
    "work_friendly": BOOLEAN,
    "pet_friendly": BOOLEAN
  },
}
“images”: [{id:NUMBER}, {id:NUMBER},{id:NUMBER}]

PUT/locals/:localId

Este endpoint actualiza un local.

Parámetros:

PARAMS: localId
BODY: información actualizada del local
Respuestas:

res.status(201).json({success:true, local: UPDATELOCAL});
res.status(400).json({success:false, message: error.message});
DELETE/locals/:localId

Este endpoint elimina un local.

Parámetros:

PARAMS: localId
Respuestas:

res.status(201).json({success: true, localDeleted});
res.status(400).json({success:false, message: error.message});

Reseñas
GET /reviews/:localId
Este endpoint devuelve las reseñas asociadas a un local que están verificadas.

Parámetros:

localId (required): Id del local
Respuestas:

200: Devuelve un objeto que contiene dos propiedades: success y reviews como un array de objetos.

json
Copy code
{
    "success": true,
    "reviews": [
        {
            "id": 1,
            "title": "soy reseña uno",
            "comment": "comida buena, sana",
            "verified": true,
            "food": 5,
            "service": 4,
            "environment": 3,
            "qaPrice": 5,
            "createdAt": "2023-04-15T20:45:00.293Z",
            "updatedAt": "2023-04-15T20:45:00.315Z",
            "LocalId": 2
        },
        {
            "id": 2,
            "title": "soy reseña dos",
            "comment": "comida buena, sana",
            "verified": true,
            "food": 5,
            "service": 3,
            "environment": 3,
            "qaPrice": 5,
            "createdAt": "2023-04-15T20:45:11.962Z",
            "updatedAt": "2023-04-15T20:45:11.978Z",
            "LocalId": 2
        }
    ]
}
400: Si hay algún error, devuelve un objeto con la propiedad success en false y el mensaje de error en message.

json
Copy code
{
    "success": false,
    "message": "Error message"
}
POST /reviews/:localId
Este endpoint permite crear una nueva reseña, asociada a un local específico, enviando la información por body.

Parámetros:

localId (required): Id del local
Body:

title (required, string): Máximo 50 caracteres.
comment (required, string): Máximo 700 caracteres.
food (required, number): Debe ser un número entre 1 y 5.
service (required, number): Debe ser un número entre 1 y 5.
environment (required, number): Debe ser un número entre 1 y 5.
qaPrice (required, number): Debe ser un número entre 1 y 5.
image (opcional, archivo): Sólo se permite un archivo.
Respuestas:

201: Si se crea la reseña exitosamente, devuelve un objeto con la propiedad success en true y la reseña creada en review.

json
Copy code
{
    "success": true,
    "review": {
        "id": 1,
        "title": "soy reseña uno",
        "comment": "comida buena, sana",
        "verified": false,
        "food": 5,
        "service": 4,
        "environment": 3,
        "qaPrice": 5,
        "createdAt": "2023-04-18T00:00:00.000Z",
        "updatedAt": "2023-04-18T00:00:00.000Z",
        "LocalId": 2
    }
}