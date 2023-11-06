const { MIEMBROS, PLANES, FAMILIAS } = require('../data');
const { validarEstructuraMiembro } = require('./validadores');


function crearMiembro(req, res) {
    validarEstructuraMiembro(req, res);
    const nuevoMiembro = req.body;
    const familiaId = parseInt(req.params.familiaId);
    // Obtener el presupuesto de la familia desde la lista FAMILIAS
    const familia = FAMILIAS.find(f => f.id === familiaId);
    if (!familia) {
        return res.status(400).json({ error: 'La familia no existe.' });
    }
    nuevoMiembro.onboarding = 'en progreso';
    if (!(nuevoMiembro.planId === undefined || nuevoMiembro.planId === null)) {
        // si se provee info del plan
        // Obtener el precio del plan del nuevo miembro desde la lista PLANES
        const plan = PLANES.find(plan => plan.id === nuevoMiembro.planId);
        if (!plan) {
            return res.status(400).json({ error: 'El plan no existe.' });
        }
        // Verificar si el presupuesto de la familia es suficiente para pagar el plan
        if (familia.presupuesto < plan.precio) {
            return res.status(400).json({ error: 'El presupuesto de la familia no es suficiente para el plan.' });
        } else {
            familia.presupuesto -= plan.precio;
            nuevoMiembro.onboarding = 'completo';
        }
    }
    

    // Asignar familiaId y ID al nuevo miembro
    const ultimoID = MIEMBROS.length > 0 ? MIEMBROS[MIEMBROS.length - 1].id : null;
    nuevoMiembro.familiaId = familiaId;
    nuevoMiembro.id = ultimoID ? ultimoID + 1 : 1;

    MIEMBROS.push(nuevoMiembro);
    return nuevoMiembro.id;
}

function borrarMiembro(req, res) {
    const id = parseInt(req.params.id);
    const miembro = MIEMBROS.find(m => m.id === id);
    if (!miembro) {
        return res.status(400).json({ error: `El miembro ${id} no existe.` });
    }
    MIEMBROS.splice(MIEMBROS.indexOf(miembro), 1);
    return id;
}

module.exports = {
    crearMiembro,
    borrarMiembro,
};