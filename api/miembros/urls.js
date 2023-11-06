const express = require('express');
const router = express.Router();
const { MIEMBROS } = require('../data');

/**
 * @swagger
 * /miembros:
 *   get:
 *     summary: Obtener todos los miembros (con filtro por onboarding).
 *     tags:
 *       - Miembros
 *     parameters:
 *       - in: query
 *         name: onboarding
 *         schema:
 *           type: string
 *         description: Filtrar por estado de onboarding (por ejemplo, 'en progreso' o 'completado').
 *     responses:
 *       200:
 *         description: Lista de miembros.
 */
router.get('/', (req, res) => {
    const { onboarding } = req.query;

    // Filtra los miembros según el parámetro 'onboarding' si se proporciona
    let miembrosFiltrados = MIEMBROS;
    if (onboarding) {
        miembrosFiltrados = MIEMBROS.filter(miembro => miembro.onboarding === onboarding);
    }

    res.json(miembrosFiltrados);
});

/**
 * @swagger
 * /miembros/{miembroId}:
 *   patch:
 *     summary: Obtener todos las miembros.
 *     tags:
 *       - Miembros
 *     responses:
 *       201:
 *         description: Lista de miembros.
 *     parameters:
 *       - in: path
 *         name: miembroId
 *         required: true
 *         description: ID del miembro a actualizar
 *         schema:
 *           type: integer
 */
router.patch('/:miembroId', (req, res) => {
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




/**
 * @swagger
 * /miembros/onboarding-estados:
 *   get:
 *     summary: Obtener los posibles estados de onboarding
 *     tags:
 *       - Miembros
 *     responses:
 *       200:
 *         description: Lista de posibles estados de onboarding
 */
router.get('/onboarding-estados', (req, res) => {
    const estadosPosibles = ['en progreso', 'completo'];
    res.json(estadosPosibles);
});

module.exports = router;