const { MIEMBROS } = require('../data');
const { validarEstructuraMiembro } = require('./validadores');

function crearMiembro(req, res) {
    validarEstructuraMiembro(req, res);
    const nuevoMiembro = req.body;
    const ultimoID = MIEMBROS.length > 0 ? MIEMBROS[MIEMBROS.length - 1].id : null;
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