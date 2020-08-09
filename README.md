# node-rest-server
Servicio API REST en Node para prácticas de curso de Udemy

## Probar servicio con POSTMAN

### Url del servicio
El servicio está publicado en Heroku, acceso público:
```
https://protected-waters-03098.herokuapp.com
```
.
.
.

### Obtener usuarios - GET
``
https://protected-waters-03098.herokuapp.com/usuario?desde=[DESDE]&limite=[HASTA]
``

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
