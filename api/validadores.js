const { FAMILIAS } = require('./data');

function validarEstructuraFamilia(req, res, next) {
    const { apellido, metodoPago } = req.body;
    if (!apellido || !metodoPago) {
      return res.status(400).json({ error: 'Los campos "apellido", "metodoPago" son obligatorios.' });
    }
    validarMetodoPago(req, res, next);
  }
  
function validarMetodoPago(req, res, next) {
    const { metodoPago } = req.body;
    if (metodoPago && !["cheque", "efectivo", "debito"].includes(metodoPago)) {
      return res.status(400).json({ error: 'El campo "metodoPago" debe ser "cheque", "efectivo" o "debito".' });
    }
    next();
}

function validarEstructuraMiembro(req, res, next) {
    const { nombre, apellido, fechaNacimiento, familiaId, inicioCobertura, finCobertura } = req.body;
    if (!nombre || !apellido || !fechaNacimiento || !familiaId || !inicioCobertura || !finCobertura) {
      return res.status(400).json({ error: 'Los campos "nombre", "apellido", "fechaNacimiento", "familiaId", "inicioCobertura", "finCobertura" son obligatorios.' });
    }
    validarFamiliaExiste(req, res, next);
}

function validarFamiliaExiste(req, res, next) {
    const { familiaId } = req.body;
    const familia = FAMILIAS.find(f => f.id === familiaId);
    if (!familia) {
      return res.status(400).json({ error: `La familia ${familiaId} no existe.` });
    }
    next();
}

module.exports = {
    validarEstructuraFamilia,
    validarEstructuraMiembro
};