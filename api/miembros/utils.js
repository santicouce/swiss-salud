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

module.exports = {
    crearMiembro,
};