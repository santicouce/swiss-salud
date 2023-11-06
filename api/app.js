const express = require('express')
const app = express()
const port = 3000
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDef = require('./swaggerDef');

// Configura Swagger
const swaggerSpec = swaggerJSDoc(swaggerDef);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a Swiss Salud!')
})


// Importa las rutas de "familias" y "miembros"
/**
 * @swagger
 * tags:
 *   - name: Familias
 *     description: Operaciones relacionadas con familias
 *   - name: Miembros
 *     description: Operaciones relacionadas con miembros de familias
 *   - name: Planes
 *     description: Operaciones relacionadas con planes de salud
 */

const rutasFamilias = require('./familias/urls');
const rutasMiembros = require('./miembros/urls');
const rutasPlanes = require('./planes/urls');

// Usa las rutas importadas en tu aplicación
app.use('/familias', rutasFamilias);
app.use('/miembros', rutasMiembros);
app.use('/planes', rutasPlanes);


app.listen(port, () => {
    console.log(`API escuchando en puerto ${port}`)
})
