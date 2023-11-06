function validarEstructuraPlan(req, res, next) {
    const { nombre, precio, descripcion, categoria } = req.body;
    if (!nombre || !precio || !descripcion || categoria) {
        return res.status(400).json({ error: 'Los campos nombre, precio, descripcion y categoria son obligatorios.' });
    }
    next();
}

module.exports = {
    validarEstructuraPlan,
};