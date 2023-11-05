const express = require('express')
const app = express()
const port = 3000

const { FAMILIAS, MIEMBROS } = require('./data');
const { validarEstructuraFamilia, validarEstructuraMiembro } = require('./validadores')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a Swiss Salud!')
})


// Familias
app.get('/familias', (req, res) => {
    res.send(FAMILIAS)
})

app.post('/familias', validarEstructuraFamilia, (req, res) => {
    const nuevaFamilia = req.body;
    const ultimoID = FAMILIAS.length > 0 ? FAMILIAS[FAMILIAS.length - 1].id : null;
    nuevaFamilia.id = ultimoID ? ultimoID + 1 : 1;
    FAMILIAS.push(nuevaFamilia);
    res.send('Familia creada exitosamente!, id: ' + nuevaFamilia.id);
})

// Miembros
app.get('/miembros', (req, res) => {
    res.send(MIEMBROS)
})
app.post('/miembros', validarEstructuraMiembro, (req, res) => {
    const nuevoMiembro = req.body;
    const ultimoID = MIEMBROS.length > 0 ? MIEMBROS[MIEMBROS.length - 1].id : null;
    nuevoMiembro.id = ultimoID ? ultimoID + 1 : 1;
    MIEMBROS.push(nuevoMiembro);
    res.send('Miembro creado exitosamente!, id: ' + nuevoMiembro.id);
}
)

app.listen(port, () => {
    console.log(`API escuchando en puerto ${port}`)
})
