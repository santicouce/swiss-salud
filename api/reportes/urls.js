const express = require('express');
const router = express.Router();
const { PLANES, MIEMBROS, FAMILIAS } = require('../data');


/**
 * @swagger
 * /reportes/planes/mas-dinero-generado:
 *   get:
 *     summary: Obtener el plan que generó más dinero y el monto total generado.
 *     tags:
 *       - Reportes
 *     responses:
 *       200:
 *         description: Plan que generó más dinero y monto total generado.
 */
router.get('/planes/mas-dinero-generado', (req, res) => {
    // Crear un objeto para realizar un seguimiento de los ingresos por plan
    const ingresosPorPlan = {};

    // Inicializar el objeto con todos los planes y establecer el recuento inicial en 0
    PLANES.forEach(plan => {
        ingresosPorPlan[plan.id] = 0;
    });

    // Iterar a través de los miembros y calcular los ingresos por plan
    MIEMBROS.forEach(miembro => {
        const planId = miembro.planId;
        if (planId !== null && ingresosPorPlan.hasOwnProperty(planId)) {
            const plan = PLANES.find(plan => plan.id === planId);
            if (plan) {
                const precioPlan = plan.precio;
                ingresosPorPlan[planId] += precioPlan;
            }
        }
    });

    // Encontrar el plan que generó más dinero
    let planMasDineroGenerado = null;
    let maxIngresos = 0;

    for (const planId in ingresosPorPlan) {
        if (ingresosPorPlan[planId] > maxIngresos) {
            maxIngresos = ingresosPorPlan[planId];
            planMasDineroGenerado = parseInt(planId);
        }
    }

    if (!isNaN(planMasDineroGenerado)) {
        // Buscar el plan que generó más dinero en la lista de PLANES
        const planDineroGenerado = PLANES.find(plan => plan.id === planMasDineroGenerado);

        if (planDineroGenerado) {
            // Calcular el monto total generado
            const montoTotalGenerado = Object.values(ingresosPorPlan).reduce((total, ingresos) => total + ingresos, 0);

            // Agregar el monto total generado a la respuesta
            const respuesta = {
                plan: planDineroGenerado,
                montoTotalGenerado: montoTotalGenerado,
            };

            res.json(respuesta);
        } else {
            res.status(404).json({ error: 'No se encontró un plan que generó más dinero.' });
        }
    } else {
        res.status(404).json({ error: 'No se encontró un plan que generó más dinero.' });
    }
});

/**
 * @swagger
 * /reportes/familias/informe:
 *   get:
 *     summary: Obtener un informe de familias con detalles de miembros y plan más usado.
 *     tags:
 *       - Reportes
 *     responses:
 *       200:
 *         description: Informe de familias con detalles de miembros y plan más usado.
 */
router.get('/familias/informe', (req, res) => {
    const informeFamilias = [];

    // Iterar a través de las familias
    FAMILIAS.forEach(familia => {
        const familiaId = familia.id;

        // Filtrar miembros por familia
        const miembrosDeFamilia = MIEMBROS.filter(miembro => miembro.familiaId === familiaId);
        const cantidadMiembros = miembrosDeFamilia.length;

        // Calcular el plan más usado en la familia
        const planMasUsado = calcularPlanMasUsado(miembrosDeFamilia);

        // Crear un objeto de informe de familia
        const informeFamilia = {
            apellido: familia.apellido,
            cantidadMiembros: cantidadMiembros,
            presupuesto: familia.presupuesto,
            planMasUsado: planMasUsado,
        };

        informeFamilias.push(informeFamilia);
    });

    res.json(informeFamilias);
});

// Función para calcular el plan más usado en una lista de miembros
function calcularPlanMasUsado(miembros) {
    const planesUsados = {};

    // Contar cuántas veces se usa cada plan en la lista de miembros
    miembros.forEach(miembro => {
        const planId = miembro.planId;
        if (planId !== null) {
            if (planesUsados[planId]) {
                planesUsados[planId]++;
            } else {
                planesUsados[planId] = 1;
            }
        }
    });

    // Encontrar el plan más usado
    let planMasUsadoId = null;
    let maxUsos = 0;

    for (const planId in planesUsados) {
        if (planesUsados[planId] > maxUsos) {
            maxUsos = planesUsados[planId];
            planMasUsadoId = planId;
        }
    }

    // Buscar el plan más usado en la lista de PLANES
    const planMasUsado = PLANES.find(plan => plan.id === parseInt(planMasUsadoId));

    return planMasUsado;
}

/**
 * @swagger
 * /reportes/familias/{familiaId}/informe:
 *   get:
 *     summary: Obtener un informe de una familia con detalles de miembros y plan más usado.
 *     tags:
 *       - Reportes
 *     parameters:
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia para generar el informe.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Informe de una familia con detalles de miembros y plan más usado.
 */
router.get('/familias/:familiaId/informe', (req, res) => {
    const familiaId = parseInt(req.params.familiaId);
    const familia = FAMILIAS.find(f => f.id === familiaId);

    if (!familia) {
        return res.status(404).json({ error: `La familia con ID ${familiaId} no existe.` });
    }

    // Filtrar miembros por familia
    const miembrosDeFamilia = MIEMBROS.filter(miembro => miembro.familiaId === familiaId);
    const cantidadMiembros = miembrosDeFamilia.length;

    // Calcular el plan más usado en la familia
    const planMasUsado = calcularPlanMasUsado(miembrosDeFamilia);

    // Crear un objeto de informe de familia
    const informeFamilia = {
        apellido: familia.apellido,
        cantidadMiembros: cantidadMiembros,
        presupuesto: familia.presupuesto,
        planMasUsado: planMasUsado,
    };

    res.json(informeFamilia);
});


module.exports = router;