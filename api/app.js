const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a Swiss Salud!')
})


// Importa las rutas de "familias" y "miembros"
const familiasRoutes = require('./familias');
const miembrosRoutes = require('./miembros');

// Usa las rutas importadas en tu aplicación
app.use('/familias', familiasRoutes);
app.use('/miembros', miembrosRoutes);


app.listen(port, () => {
    console.log(`API escuchando en puerto ${port}`)
})
