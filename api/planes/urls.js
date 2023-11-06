const express = require('express');
const router = express.Router();
const { PLANES } = require('../data');

/**
 * @swagger
 * /planes:
 *   get:
 *     summary: Obtener todos las planes disponibles.
 *     tags:
 *       - Planes
 *     responses:
 *       200:
 *         description: Lista de planes.
 */
router.get('/', (req, res) => {
    res.send(PLANES)
})

/**
 * @swagger
 * /planes/{planId}:
 *   get:
 *     summary: Obtener detalles de un plan.
 *     tags:
 *       - Planes
 *     responses:
 *       200:
 *         description: Detalles de un plan.
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         description: ID del plan a obtener
 *         schema:
 *           type: integer
 */
router.get('/:planId', (req, res) => {
    const id = parseInt(req.params.planId);
    const plan = PLANES.find(p => p.id === id);
    if (!plan) {
        return res.status(400).json({ error: `El plan ${id} no existe.` });
    }
    res.send(plan)
})

/**
 * @swagger
 * /planes:
 *   post:
 *     summary: Crear un plan.
 *     tags:
 *       - Planes
 *     responses:
 *       201:
 *         description: Crear un plan.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Plan X1000"
 *             descripcion: "Plan que contiene beneficios basicos hasta mil dolares de cobertura"
 *             precio: 2000
 */
router.post('/', (req, res) => {
    const nuevoPlan = req.body;
    const ultimoID = PLANES.length > 0 ? PLANES[PLANES.length - 1].id : null;
    nuevoPlan.id = ultimoID ? ultimoID + 1 : 1;
    PLANES.push(nuevoPlan);
    res.status(201);
    res.send('Plan creado exitosamente!, id: ' + nuevoPlan.id);
})

module.exports = router;
