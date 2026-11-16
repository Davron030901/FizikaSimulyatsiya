import { test } from 'node:test';
import assert from 'node:assert/strict';
import { values, experiments } from './physics.ts';
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
test('Complementary launch angles have equal range and land at zero height', () => {
  const a = values('projectile', [20, 30, 9.8], 0);
  near(a.range, values('projectile', [20, 60, 9.8], 0).range);
  near(values('projectile', [20, 30, 9.8], a.flight).y, 0);
});
test('Pendulum period scales with square root of length', () => {
  near(values('pendulum', [4, 10, 9.8], 0).period / values('pendulum', [1, 10, 9.8], 0).period, 2);
});
test('Spring conserves total mechanical energy', () => {
  for (let t = 0; t < 20; t += .1) {
    const v = values('spring', [2, 30, .6], t);
    near(v.kinetic + v.potential, 5.4);
  }
});
test('Ohm, ideal gas, and Snell relationships', () => {
  near(values('circuit', [12, 30], 0).current, .4);
  near(values('gas', [400, 25], 0).pressure / values('gas', [200, 25], 0).pressure, 2);
  near(values('optics', [40, 1], 0).angle, 40);
});
test('All allowed parameter extremes produce finite values', () => {
  for (const e of experiments) {
    for (const bound of ['min', 'max', 'value']) {
      for (const t of [0, 1, 100]) {
        const result = values(e.id, e.parameters.map(p => p[bound]), t);
        for (const n of Object.values(result)) assert.ok(Number.isFinite(n), e.id);
      }
    }
  }
});
