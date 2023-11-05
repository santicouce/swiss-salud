const express = require('express')
const app = express()
const port = 3000

const { FAMILIAS, MIEMBROS } = require('./data');
const { validarEstructuraFamilia } = require('./validators')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a Swiss Salud!')
})

app.get('/familias', (req, res) => {
  res.send(FAMILIAS)
})

app.post('/familias', validarEstructuraFamilia, (req, res) => {
  const nuevaFamilia = req.body;
  FAMILIAS.push(nuevaFamilia);
  res.send('Familia creada');
})

app.listen(port, () => {
  console.log(`API escuchando en puerto ${port}`)
})
