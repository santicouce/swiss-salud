const express = require('express');
const router = express.Router();
const { MIEMBROS } = require('../data');

router.get('/', (req, res) => {
    res.send(MIEMBROS)
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const miembro = MIEMBROS.find(m => m.id === id);
    if (!miembro) {
        return res.status(400).json({ error: `El miembro ${id} no existe.` });
    }
    MIEMBROS.splice(MIEMBROS.indexOf(miembro), 1);
    res.send('Miembro eliminado exitosamente!, id: ' + id);
})

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const miembro = MIEMBROS.find(m => m.id === id);
    if (!miembro) {
        return res.status(400).json({ error: `El miembro ${id} no existe.` });
    }
    const { nombre, apellido, fechaNacimiento, familiaId, inicioCobertura, finCobertura } = req.body;
    if (nombre) {
        miembro.nombre = nombre;
    }
    if (apellido) {
        miembro.apellido = apellido;
    }
    if (fechaNacimiento) {
        miembro.fechaNacimiento = fechaNacimiento;
    }
    if (familiaId) {
        miembro.familiaId = familiaId;
    }
    if (inicioCobertura) {
        miembro.inicioCobertura = inicioCobertura;
    }
    if (finCobertura) {
        miembro.finCobertura = finCobertura;
    }
    res.send('Miembro actualizado exitosamente!, id: ' + id);
})

module.exports = router;