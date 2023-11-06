# Swiss Salud

Esta API se usara para ayudar en la administracion de el proveedor de salud "Swiss Salud". 

Este sistema parmite gestionar las siguiente entidades:

- Grupo familiar
- Miembros
- Planes de salud

Se incluyen metodos para dar de alta, modificar, borrar, y combinar las entidades mencionadas. Como por ejemplo, dar de alta un miembro, ingresarlo como parte de un grupo familiar y asignarle un plan de salud. 

## Acciones soportadas por el sistema:

- Dar de alta un miembro.
- Dar de baja un miembro.
- Actualizar datos de un miembro.
- Obtener listado de todos los miembros que pertenecen a un grupo familiar.
- Dar de alta un grupo familiar.
- Dar de baja un grupo familiar.
- Obtener listado de todos los grupos familiares.
- Marcar un miembro como integrante de un grupo familiar.
- Crear un plan.
- Modificar un plan.
- Dar de baja un plan
- Obtener listado de todos los planes.

Ademas, los metodos para obtener informacion, permitiran filtrar estos datos a traves de parametros opcionales que se detallaran en la documentacion del API.


## Documentacion

Para ver la documentacion completa de la API acceder a la ruta /api-docs

## Logica de negocio

- Los actores principales de este sistema son Planes, Familias y Miembros.
- Una familia contiene miembros, y cada miembro puede tener un plan asociado.
- Los planes con independientes por lo que no necesitan de un miembro ni de una familia.
- Un miembro debe ser asociado a una familia. No puede crearse por fuera de una familia.
- Al crear un miembro, si no se proporciona un planId, el estado de onboarding sera "en progreso". Una vez que el miembro tenga un plan asociado, el estado de onbarding pasara a "completo".
- La familia tiene un presupuesto mensual que se setea al crear la familia. A medidca que se van agregando miembros, se verificara que haya presupuesto disponible para el pago del plan asociado al nuevo miembro.
- Se considera que las familias tienen presupuesto bajo si su presupuesto actual es menor que el precio del plan mas barato que estamos ofreciendo.
- Un plan puede ser de categoria superior, media o baja.