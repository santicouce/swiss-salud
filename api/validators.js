function validarEstructuraFamilia(req, res, next) {
    const { apellido, inicioCobertura } = req.body;
    if (!apellido || !inicioCobertura) {
      return res.status(400).json({ error: 'Los campos "apellido" e "inicioCobertura" son obligatorios.' });
    }
    next();
  }
  
  module.exports = {
    validarEstructuraFamilia
  };