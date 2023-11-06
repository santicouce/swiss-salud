module.exports = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Swiss Salud',
        version: '1.0.0',
        description: 'Documentación de la API Swiss Salud',
      },
    },
    apis: ['./apps.js', './miembros/urls.js', './familias/urls.js', './planes/urls.js', './reportes/urls.js'],
  };
  