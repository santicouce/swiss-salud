const express = require('express')
const app = express()
const port = 3000

const { FAMILIAS, MIEMBROS } = require('./data');
const { validarEstructuraFamilia } = require('./validadores')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a Swiss Salud!')
})

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

app.listen(port, () => {
    console.log(`API escuchando en puerto ${port}`)
})
