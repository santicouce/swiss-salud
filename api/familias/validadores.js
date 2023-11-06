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

module.exports = {
    validarEstructuraFamilia,
};