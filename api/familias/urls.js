const express = require('express');
const router = express.Router();
const { FAMILIAS, MIEMBROS } = require('../data');
const { validarEstructuraFamilia } = require('./validadores');
const { crearMiembro } = require('../miembros/utils');


router.get('/', (req, res) => {
    res.send(FAMILIAS)
})

router.post('/', validarEstructuraFamilia, (req, res) => {
    const nuevaFamilia = req.body;
    const ultimoID = FAMILIAS.length > 0 ? FAMILIAS[FAMILIAS.length - 1].id : null;
    nuevaFamilia.id = ultimoID ? ultimoID + 1 : 1;
    FAMILIAS.push(nuevaFamilia);
    res.send('Familia creada exitosamente!, id: ' + nuevaFamilia.id);
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const familia = FAMILIAS.find(f => f.id === id);
    if (!familia) {
        return res.status(400).json({ error: `La familia ${id} no existe.` });
    }
    const miembros = MIEMBROS.filter(m => m.familiaId === id);
    if (miembros.length > 0) {
        return res.status(400).json({ error: `La familia ${id} tiene miembros asociados. Primero elimine los miembros.` });
    }
    FAMILIAS.splice(FAMILIAS.indexOf(familia), 1);
    res.send('Familia eliminada exitosamente!, id: ' + id);
})

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const familia = FAMILIAS.find(f => f.id === id);
    if (!familia) {
        return res.status(400).json({ error: `La familia ${id} no existe.` });
    }
    const { apellido, metodoPago } = req.body;
    if (apellido) {
        familia.apellido = apellido;
    }
    if (metodoPago) {
        familia.metodoPago = metodoPago;
    }
    res.send('Familia actualizada exitosamente!, id: ' + id);
})

router.post('/:id/miembros', (req, res) => {
    nuevoId = crearMiembro(req, res);
    res.send('Miembro creado exitosamente!, id: ' + nuevoId);
})

module.exports = router;
