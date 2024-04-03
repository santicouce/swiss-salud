// data.js
const FAMILIAS = [
    {
        "id": 1,
        "apellido": "Perez",
        "metodoPago": "debito",
        "presupuesto": 30000,
    },
    {
        "id": 2,
        "apellido": "Couce",
        "metodoPago": "cheque",
        "presupuesto": 500,
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
        "planId": 1,
        "onboarding": 'completo',
    },
    {
        "id": 2,
        "nombre": "Maria",
        "apellido": "Perez",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 1,
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
        "planId": 1,
        "onboarding": 'completo',
    },
    {
        "id": 3,
        "nombre": "Juan",
        "apellido": "Couce",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 2,
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
        "planId": 2,
        "onboarding": 'completo',
    },
    {
        "id": 4,
        "nombre": "Maria",
        "apellido": "Couce",
        "fechaNacimiento": "01-01-2000",
        "familiaId": 2,
        "inicioCobertura": "01-01-2024",
        "finCobertura": "01-01-2025",
        "planId": null,
        "onboarding": 'en progreso',
    }
];

const PLANES = [
    {
        "id": 1,
        "nombre": "Silver plan",
        "descripcion": "Plan que contiene beneficios basicos",
        "precio": 1000,
        "categoria": "baja",
    },
    {
        "id": 2,
        "nombre": "Golden plan",
        "descripcion": "Plan que contiene beneficios completos",
        "precio": 2000,
        "categoria": "media",
    },
    {
        "id": 3,
        "nombre": "Platinum plan",
        "descripcion": "Plan que contiene beneficios medios",
        "precio": 3000,
        "categoria": "media",
    },
    {
        "id": 4,
        "nombre": "Copper plan",
        "descripcion": "Plan que contiene beneficios completos y extras",
        "precio": 4000,
        "categoria": "superior",
    }
];

module.exports = {
  FAMILIAS,
  MIEMBROS,
  PLANES,
};
