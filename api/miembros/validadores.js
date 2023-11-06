function validarEstructuraMiembro(req, res) {
    const { nombre, apellido, fechaNacimiento, inicioCobertura, finCobertura } = req.body;
    if (!nombre || !apellido || !fechaNacimiento || !inicioCobertura || !finCobertura) {
      return res.status(400).json({ error: 'Los campos "nombre", "apellido", "fechaNacimiento", "inicioCobertura", "finCobertura" son obligatorios.' });
    }
}

module.exports = {
    validarEstructuraMiembro,
};