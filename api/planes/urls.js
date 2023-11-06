const express = require('express');
const router = express.Router();
const { PLANES } = require('../data');
const { validarEstructuraPlan } = require('./validadores');

/**
 * @swagger
 * /planes:
 *   get:
 *     summary: Obtener todos las planes disponibles (con filtro por precio y categoría).
 *     tags:
 *       - Planes
 *     parameters:
 *       - in: query
 *         name: precioMaximo
 *         schema:
 *           type: number
 *         description: Filtrar por precio (opcional).
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría (opcional). Puede ser baja, media o superior.
 *     responses:
 *       200:
 *         description: Lista de planes.
 */
router.get('/', (req, res) => {
    const { precioMaximo, categoria } = req.query;
    const planesFiltrados = PLANES;

    // Si se proporciona un filtro de precio, lo aplicamos
    if (precioMaximo) {
        planesFiltrados = planesFiltrados.filter(plan => plan.precio <= parseFloat(precioMaximo));
    }

    // Si se proporciona un filtro de categoría, lo aplicamos
    if (categoria) {
        planesFiltrados = planesFiltrados.filter(plan => plan.categoria === categoria);
    }

    res.json(planesFiltrados);
});


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

/**
 * @swagger
 * /planes/{planId}:
 *   patch:
 *     summary: Actualizar un plan existente.
 *     tags:
 *       - Planes
 *     responses:
 *       200:
 *         description: Plan actualizado.
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         description: ID del plan a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Plan Actualizado"
 *             descripcion: "Descripción actualizada"
 *             precio: 2500
 *             categoria: "media"
 */
router.patch('/:planId', (req, res) => {
    const id = parseInt(req.params.planId);
    const plan = PLANES.find(p => p.id === id);

    if (!plan) {
        return res.status(400).json({ error: `El plan ${id} no existe.` });
    }

    // Actualizar los parámetros del plan con los valores proporcionados en el cuerpo de la solicitud
    const { nombre, descripcion, precio, categoria } = req.body;
    if (nombre) {
        plan.nombre = nombre;
    }
    if (descripcion) {
        plan.descripcion = descripcion;
    }
    if (precio) {
        plan.precio = precio;
    }
    if (categoria) {
        plan.categoria = categoria;
    }

    res.status(200);
    res.send('Plan actualizado exitosamente!, id: ' + id);
});

/**
 * @swagger
 * /planes/{planId}:
 *   delete:
 *     summary: Eliminar un plan.
 *     tags:
 *       - Planes
 *     responses:
 *       204:
 *         description: Plan eliminado.
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         description: ID del plan a eliminar
 *         schema:
 *           type: integer
 */
router.delete('/:planId', (req, res) => {
    const id = parseInt(req.params.planId);
    const planIndex = PLANES.findIndex(plan => plan.id === id);

    if (planIndex === -1) {
        return res.status(400).json({ error: `El plan ${id} no existe.` });
    }
    // Compruebo si algún miembro tiene el plan asociado
    const miembrosConPlan = MIEMBROS.filter(miembro => miembro.planId === id);

    if (miembrosConPlan.length > 0) {
        return res.status(400).json({ error: `El plan ${id} no se puede eliminar porque está asociado a miembros.` });
    }
    // Eliminar el plan de la lista de PLANES
    PLANES.splice(planIndex, 1);

    res.status(204);
    res.send('Plan eliminado exitosamente!, id: ' + id);
});

/**
 * @swagger
 * /planes/{planId}:
 *   put:
 *     summary: Actualizar un plan existente en su totalidad.
 *     tags:
 *       - Planes
 *     responses:
 *       200:
 *         description: Plan actualizado.
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         description: ID del plan a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Plan Actualizado"
 *             descripcion: "Descripción actualizada"
 *             precio: 2500
 *             categoria: "media"
 */
router.put('/:planId', validarEstructuraPlan, (req, res) => {
    const id = parseInt(req.params.planId);
    const plan = PLANES.find(p => p.id === id);

    if (!plan) {
        return res.status(400).json({ error: `El plan ${id} no existe.` });
    }

    // Reemplazar completamente los parámetros del plan con los valores proporcionados en el cuerpo de la solicitud
    const { nombre, descripcion, precio, categoria } = req.body;
    plan.nombre = nombre;
    plan.descripcion = descripcion;
    plan.precio = precio;
    plan.categoria = categoria;

    res.status(200);
    res.send('Plan actualizado exitosamente!, id: ' + id);
});


module.exports = router;
