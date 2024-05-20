const request = require('supertest');
const app = require('/api');

describe('GET /miembros', () => {
  it('debería devolver una lista de miembros', async () => {
    const response = await request(app)
      .get('/miembros')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez',
        fechaNacimiento: '01-01-2000',
        familiaId: 1,
        inicioCobertura: '01-01-2024',
        finCobertura: '01-01-2025',
        planId: 1,
        onboarding: 'completo'
      },
      {
        id: 2,
        nombre: 'Maria',
        apellido: 'Perez',
        fechaNacimiento: '01-01-2000',
        familiaId: 1,
        inicioCobertura: '01-01-2024',
        finCobertura: '01-01-2025',
        planId: 1,
        onboarding: 'completo'
      },
      {
        id: 3,
        nombre: 'Juan',
        apellido: 'Couce',
        fechaNacimiento: '01-01-2000',
        familiaId: 2,
        inicioCobertura: '01-01-2024',
        finCobertura: '01-01-2025',
        planId: 2,
        onboarding: 'completo'
      },
      {
        id: 4,
        nombre: 'Maria',
        apellido: 'Couce',
        fechaNacimiento: '01-01-2000',
        familiaId: 2,
        inicioCobertura: '01-01-2024',
        finCobertura: '01-01-2025',
        planId: null,
        onboarding: 'en progreso'
      }
    ]);
  });
});
