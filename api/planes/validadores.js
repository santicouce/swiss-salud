function validarEstructuraPlan(req, res, next) {
    const { nombre, precio, descripcion } = req.body;
    if (!nombre || !precio || !descripcion) {
        return res.status(400).json({ error: 'Debe proveer datos de nombre, precio y descripcion.' });
    }
    next();
}

module.exports = {
    validarEstructuraPlan,
};