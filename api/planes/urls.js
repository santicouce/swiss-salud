const express = require('express');
const router = express.Router();
const { PLANES } = require('../data');
const { validarEstructuraPlan } = require('./validadores');

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
 *     summary: Obtener detalles de un plan o filtrar por categoría.
 *     tags:
 *       - Planes
 *     responses:
 *       200:
 *         description: Detalles de un plan o lista de planes filtrados.
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         description: ID del plan a obtener
 *         schema:
 *           type: integer
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría. (baja, media, superior)
 */
router.get('/:planId', (req, res) => {
    const id = parseInt(req.params.planId);
    const categoria = req.query.categoria; // Obtener el valor de la consulta "categoria"

    if (categoria) {
        // Filtrar planes por categoría si se proporciona una consulta "categoria"
        const planesFiltrados = PLANES.filter(plan => plan.categoria === categoria);
        res.send(planesFiltrados);
    } else {
        // Obtener detalles de un plan específico si no se proporciona "categoria"
        const plan = PLANES.find(p => p.id === id);
        if (!plan) {
            return res.status(400).json({ error: `El plan ${id} no existe.` });
        }
        res.send(plan);
    }
});

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
 *             categoria: "baja"
 */
router.post('/', validarEstructuraPlan, (req, res) => {
    const nuevoPlan = req.body;
    const ultimoID = PLANES.length > 0 ? PLANES[PLANES.length - 1].id : null;
    nuevoPlan.id = ultimoID ? ultimoID + 1 : 1;
    PLANES.push(nuevoPlan);
    res.status(201);
    res.send('Plan creado exitosamente!, id: ' + nuevoPlan.id);
})

module.exports = router;
