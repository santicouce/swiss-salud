const express = require('express');
const router = express.Router();
const { FAMILIAS, MIEMBROS } = require('../data');
const { validarEstructuraFamilia } = require('./validadores');
const { crearMiembro, borrarMiembro } = require('../miembros/utils');
const { obtenerPrecioPlanMasBarato } = require('../planes/utils');


/**
 * @swagger
 * /familias:
 *   get:
 *     summary: Obtener todas las familias.
 *     tags:
 *       - Familias
 *     responses:
 *       201:
 *         description: Lista de familias.
 */
router.get('/', (req, res) => {
    res.send(FAMILIAS)
})

/**
 * @swagger
 * /familias:
 *   post:
 *     summary: Crear una familia.
 *     tags:
 *       - Familias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             apellido: "Perez"
 *             metodoPago: "cheque"
 *     responses:
 *       201:
 *         description: Lista de familias.
 */
router.post('/', validarEstructuraFamilia, (req, res) => {
    const nuevaFamilia = req.body;
    const ultimoID = FAMILIAS.length > 0 ? FAMILIAS[FAMILIAS.length - 1].id : null;
    nuevaFamilia.id = ultimoID ? ultimoID + 1 : 1;
    FAMILIAS.push(nuevaFamilia);
    res.status(201);
    res.send('Familia creada exitosamente!, id: ' + nuevaFamilia.id);
})

/**
 * @swagger
 * /familias/{familiaId}:
 *   delete:
 *     summary: Borrar una familia.
  *     tags:
 *       - Familias
 *     responses:
 *       204:
 *         description: Familia borrada.
 *     parameters:
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a actualizar
 *         schema:
 *           type: integer
 */
router.delete('/:familiaId', (req, res) => {
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
    res.status(204);
    res.send('Familia eliminada exitosamente!, id: ' + id);
})

/**
 * @swagger
 * /familias/{familiaId}:
 *   patch:
 *     summary: Actualiza los datos de una familia
 *     tags:
 *       - Familias
 *     parameters:
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             apellido: "NuevoApellido"
 *             metodoPago: "debito"
 *     responses:
 *       200:
 *         description: Familia actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.patch('/:familiaId', (req, res) => {
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

/**
 * @swagger
 * /familias/{familiaId}:
 *   put:
 *     summary: Actualizar una familia existente en su totalidad.
 *     tags:
 *       - Familias
 *     responses:
 *       200:
 *         description: Familia actualizada.
 *     parameters:
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             apellido: "Apellido Actualizado"
 *             inicioCobertura: "02/01/2024"
 *             presupuesto: 3000
 */
router.put('/:familiaId', validarEstructuraFamilia, (req, res) => {
    const id = parseInt(req.params.familiaId);
    const familia = FAMILIAS.find(f => f.id === id);

    if (!familia) {
        return res.status(400).json({ error: `La familia ${id} no existe.` });
    }

    // Reemplazar completamente los parámetros de la familia con los valores proporcionados en el cuerpo de la solicitud
    const { apellido, inicioCobertura, presupuesto } = req.body;
    familia.apellido = apellido;
    familia.inicioCobertura = inicioCobertura;
    familia.presupuesto = presupuesto;

    res.status(200);
    res.send('Familia actualizada exitosamente!, id: ' + id);
});


/**
 * @swagger
 * /familias/{familiaId}/miembros:
 *   post:
 *     summary: Crear un miembro perteneciente a la familia.
 *     tags:
 *       - Familias
 *     parameters:
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a la cual pertenecera el miembro a crear
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Santiago"
 *             apellido: "Couce"
 *             fechaNacimiento: "01-01-2000"
 *             inicioCobertura: "01-01-2024"
 *             finCobertura: "01-01-2025"
 *             planId: 1
 *     responses:
 *       201:
 *         description: Miembro creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/:familiaId/miembros', (req, res) => {
    nuevoId = crearMiembro(req, res);
    res.status(201);
    res.send('Miembro creado exitosamente!, id: ' + nuevoId);
})

/**
 * @swagger
 * /familias/{familiaId}/miembros/{miembroId}:
 *   delete:
 *     summary: Borrar un miembro perteneciente a una familia.
 *     tags:
 *       - Familias
 *     parameters:
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a la cual pertenecera el miembro a borrar
 *         schema:
 *           type: integer
 *       - in: path
 *         name: miembroId
 *         required: true
 *         description: ID del miembro a borrar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Miembro creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.delete('/:familiaId/miembros/:miembroId', (req, res) => {
    miembroId = borrarMiembro(req, res);
    res.status(204);
    res.send('Miembro borrado exitosamente!, id: ' + miembroId);
})

/**
 * @swagger
 * familias/{familiaId}/miembros/{miembroId}:
 *   put:
 *     summary: Actualizar un miembro existente en su totalidad.
 *     tags:
 *       - Familias
 *     responses:
 *       200:
 *         description: Miembro actualizado.
 *     parameters:
 *       - in: path
 *         name: miembroId
 *         required: true
 *         description: ID del miembro a actualizar
 *         schema:
 *           type: integer
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a la cual pertenece el miembro a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Nombre Actualizado"
 *             apellido: "Apellido Actualizado"
 *             fechaNacimiento: "02/02/1990"
 *             familiaId: 2
 *             inicioCobertura: "02/01/2024"
 *             finCobertura: "02/01/2025"
 *             planId: 1
 */
router.put('/:familiaId/miembros/:miembroId', (req, res) => {
    const id = parseInt(req.params.miembroId);
    const miembro = MIEMBROS.find(m => m.id === id);

    if (!miembro) {
        return res.status(400).json({ error: `El miembro ${id} no existe.` });
    }

    // Reemplazar completamente los parámetros del miembro con los valores proporcionados en el cuerpo de la solicitud
    const { nombre, apellido, fechaNacimiento, familiaId, inicioCobertura, finCobertura, planId } = req.body;
    miembro.nombre = nombre;
    miembro.apellido = apellido;
    miembro.fechaNacimiento = fechaNacimiento;
    miembro.familiaId = familiaId;
    miembro.inicioCobertura = inicioCobertura;
    miembro.finCobertura = finCobertura;
    miembro.planId = planId;

    res.status(200);
    res.send('Miembro actualizado exitosamente!, id: ' + id);
});


/**
 * @swagger
 * /familias/{familiaId}/miembros:
 *   get:
 *     summary: Obtener todos los miembros pertenecientes a la familia
 *     tags:
 *       - Familias
 *     parameters:
 *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a la cual pertenecera el miembro a borrar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de miembros pertenecientes a la familia.
 *       400:
 *         description: Error en la solicitud
 */
router.get('/:familiaId/miembros', (req, res) => {
    const id = parseInt(req.params.familiaId);
    const familia = FAMILIAS.find(f => f.id === id);
    if (!familia) {
        return res.status(400).json({ error: `La familia ${id} no existe.` });
    }
    const miembros = MIEMBROS.filter(m => m.familiaId === id);
    res.send(miembros);
})

/**
 * @swagger
 * /{familiaId}/miembros/{miembroId}:
 *   patch:
 *     summary: Actualizar los datos de un miembro perteneciente a la familia.
 *     tags:
 *       - Familias
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
  *       - in: path
 *         name: familiaId
 *         required: true
 *         description: ID de la familia a la cual pertenece el miembro
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Santiago"
 *             apellido: "Couce"
 *             fechaNacimiento: "01-01-2000"
 *             inicioCobertura: "01-01-2024"
 *             finCobertura: "01-01-2025"
 *             planId: 1
 */
router.patch('/:familiaId/miembros/:miembroId', (req, res) => {
    const id = parseInt(req.params.miembroId);
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
 * /familias/avisar-poco-presupuesto:
 *   post:
 *     summary: Enviar correo electrónico a familias con presupuesto bajo.
 *     tags:
 *       - Familias
 *     responses:
 *       200:
 *         description: Email enviado a familias con presupuesto bajo.
 */
router.post('/avisar-poco-presupuesto', (req, res) => {
    const precioPlanMasBarato = obtenerPrecioPlanMasBarato();

    FAMILIAS.forEach(familia => {
        if (familia.presupuesto < precioPlanMasBarato) {
            console.log('Email enviado a la familia con presupuesto bajo: ' + familia.apellido);
        }
    });

    res.status(200).send('Email enviado a familias con presupuesto bajo.');
});


module.exports = router;
