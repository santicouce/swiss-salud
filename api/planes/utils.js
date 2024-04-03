const { PLANES } = require('../data');

function obtenerPrecioPlanMasBarato() {
    return PLANES.reduce((prev, curr) => {
        return prev.precio < curr.precio ? prev.precio : curr.precio;
    });
}

module.exports = {
    obtenerPrecioPlanMasBarato,
};