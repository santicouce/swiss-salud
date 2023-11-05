// data.js
const FAMILIAS = [
    {
        "id": 1,
        "apellido": "Perez",
        "metodoPago": "debito",
    },
    {
        "id": 2,
        "apellido": "Couce",
        "metodoPago": "cheque",
    }
];

const MIEMBROS = [
    {
        "id": 1,
        "nombre": "Juan",
        "apellido": "Perez",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 1,
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
    },
    {
        "id": 2,
        "nombre": "Maria",
        "apellido": "Perez",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 1,
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
    },
    {
        "id": 3,
        "nombre": "Juan",
        "apellido": "Couce",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 2,
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
    },
    {
        "id": 4,
        "nombre": "Maria",
        "apellido": "Couce",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 2,
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
    }
];

module.exports = {
  FAMILIAS,
  MIEMBROS,
};
