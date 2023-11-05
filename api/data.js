// data.js
const FAMILIAS = [
    {
        "id": 1,
        "apellido": "Perez",
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
    },
    {
        "id": 2,
        "apellido": "Couce",
        "inicioCobertura": "01-12-2023",
        "finCobertura": "01-12-2024",
    }
];

const MIEMBROS = [
    {
        "id": 1,
        "nombre": "Juan",
        "apellido": "Perez",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 1,
    },
    {
        "id": 2,
        "nombre": "Maria",
        "apellido": "Perez",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 1,
    },
    {
        "id": 3,
        "nombre": "Juan",
        "apellido": "Couce",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 2,
    },
    {
        "id": 4,
        "nombre": "Maria",
        "apellido": "Couce",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 2,
    }
];

module.exports = {
  FAMILIAS,
  MIEMBROS,
};
