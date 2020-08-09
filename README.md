# node-rest-server
Servicio API REST en Node para prácticas de curso de Udemy.

Documentación de la API POSTMAN: 
``https://documenter.getpostman.com/view/4873591/T1LJkoqv?version=latest#0141fa10-0ea0-4008-a7e0-c354f24ca64e``

El servicio tiene login normal con usuarios actualmente en la BD, como tambien con Google, el cual si no existe el usuario actualmente lo crea.
La autenticación por google, contiene una validación directamente con la api de google, por lo tanto no se guardará la contraseña en ningún momento.


## Probar servicio con POSTMAN
El servicio cuenta con autenticación con JWT, por lo tanto hay que realizar primero el login para obtener el token, y el mismo enviarlo en el resto de llamadas al servicio en el header con la propiedad ``token``.

### Url del servicio
El servicio está publicado en Heroku, acceso público:
```
https://protected-waters-03098.herokuapp.com
```
.
.
.

### Login normal - POST
``
https://protected-waters-03098.herokuapp.com/login
``

#### Body
- `email`
- `password` 
> Actualmente no existe la funcionalidad crear usuario, por lo tanto se pueden usar estas credenciales para probar:
> usuario: Prueba1@gmail.com
> Contraseña: 12345

El token que regresa, se debe colocar en el header del resto de llamadas como `token: [token]`

.
.
.

### Obtener usuarios - GET
``
https://protected-waters-03098.herokuapp.com/usuario?desde=[DESDE]&limite=[HASTA]
``

#### Headers 
- `token` Token retornado en el login de usuario

#### Params (opcionales)
- `desde` Indica a partir de cual registro retornará
- `limite` Indica la cantidad de registros que retornara

#### Ejemplos
- Retorna todos los usuarios registrados `` https://protected-waters-03098.herokuapp.com/usuario `` 
- Retorna todos los usuarios a partir del 3er registro `` https://protected-waters-03098.herokuapp.com/usuario?desde=3 `` 
- Retorna los primeros 7 registros `` https://protected-waters-03098.herokuapp.com/usuario?limite=7 `` 
- Retorna los 8 registros a partir del 4to registro `` https://protected-waters-03098.herokuapp.com/usuario?limite=8&desde=4 `` 

.
.
.

### Crear usuarios - POST
``
https://protected-waters-03098.herokuapp.com/usuario
``

#### Headers 
- `token` Token retornado en el login de usuario

#### Body
- `nombre`
- `role` (Opcional) - Únicos valores admitidos son: USER_ROLE o ADMIN_ROLE
- `asdasd` 	
- `email` No se creará usuario con email ya existente
- `password`

.
.
.

### Modificar usuarios - UPDATE
``
https://protected-waters-03098.herokuapp.com/usuario/[ID_USUARIO]
``
> Ejemplo: `https://protected-waters-03098.herokuapp.com/usuario/5f2f6df6b48cfe4774554471`


#### Headers 
- `token` Token retornado en el login de usuario

#### Body
- `nombre`
- `asdasd` 	
- `email` No se modificará el usuario con email ya existente

 > El `ID_USUARIO` se obtiene del parámetro _Id de la información del usuario.

.
.
.

### Deshabilitar usuarios - DELETE
``
https://protected-waters-03098.herokuapp.com/usuario/[ID_USUARIO]
``
> Ejemplo: `https://protected-waters-03098.herokuapp.com/usuario/5f2f6df6b48cfe4774554471`

> El `ID_USUARIO` se obtiene del parámetro _Id de la información del usuario.

#### Headers 
- `token` Token retornado en el login de usuario

