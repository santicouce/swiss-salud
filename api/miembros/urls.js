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

/**
 * @swagger
 * /miembros/renovacion:
 *   get:
 *     summary: Obtener miembros que cumplen con los criterios para renovar su cobertura proxima a vencer.
 *     tags:
 *       - Miembros
 *     responses:
 *       200:
 *         description: Lista de miembros que cumplen con los criterios para renovar su cobertura proxima a vencer.
 */
router.get('/renovacion', (req, res) => {
    const hoy = new Date(); // Obtener la fecha actual

    // Filtra los miembros que cumplen con los criterios
    const miembrosFiltrados = MIEMBROS.filter(miembro => {
        // Verifica si el miembro tiene onboarding completo
        const tieneOnboardingCompleto = miembro.onboarding === 'completo';

        // Verifica si la cobertura vence en menos de 1 mes
        const fechaVencimientoCobertura = new Date(miembro.finCobertura);
        const tiempoRestante = fechaVencimientoCobertura - hoy;
        const diasRestantes = tiempoRestante / (1000 * 3600 * 24); // Diferencia en días, ya que tiempoRestante está en milisegundos
        const venceEnMenosDeUnMes = diasRestantes <= 30;

        // Verifica si el grupo familiar tiene más de 4 miembros
        const miembrosFamilia = MIEMBROS.filter(f => f.familiaId === miembro.familiaId);
        const grupoFamiliarGrande = miembrosFamilia.length > 4;

        // El miembro cumple con los tres criterios
        return tieneOnboardingCompleto && venceEnMenosDeUnMes && grupoFamiliarGrande;
    });

    res.json(miembrosFiltrados);
});

module.exports = router;