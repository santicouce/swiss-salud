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
 *         description: Filtrar por estado de onboarding (por ejemplo, 'en progreso' o 'completo').
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