// Smoke test for Data Layer

// NOT loaded in index.html. Run manually from DevTools console:
//   import('./js/data/__smoke.js').then(m => m.runSmoke());
// Checks CRUD cycle and basic invariants. Logs assertions.

import { languageService } from './languageService.js';

function assert(cond, msg) {
  if (cond) console.log('%c✓', 'color:#4CAF7D', msg);
  else console.error('✗', msg);
  return cond;
}

export async function runSmoke() {
  console.group('Legacy Epitaph — smoke test for Data Layer');

  await languageService.seedIfEmpty();
  const before = await languageService.getAll();
  assert(before.length > 0, `seed populated the store (${before.length} records)`);

  const living = await languageService.getLiving();
  assert(living.every((l) => l.status === 'living'), 'getLiving() returns only living');

  const timeline = await languageService.getEvolutionTimeline();
  const sorted = timeline.every((l, i) => i === 0 || timeline[i - 1].year_created <= l.year_created);
  assert(sorted, 'getEvolutionTimeline() is sorted by year_created');

  // create → getById → update → remove
  const created = await languageService.create({
    name: '__TestLang__', status: 'living', year_created: 2024, popularity: 1, epitaph: 'temp',
  });
  assert(created.id && created.created_at, 'create() generates id and created_at');

  const fetched = await languageService.getById(created.id);
  assert(fetched && fetched.name === '__TestLang__', 'getById() finds the created record');

  const updated = await languageService.update(created.id, { popularity: 42 });
  assert(updated.popularity === 42, 'update() changes the field');

  await languageService.remove(created.id);
  const gone = await languageService.getById(created.id);
  assert(gone === null, 'remove() deletes the record');

  const after = await languageService.getAll();
  assert(after.length === before.length, 'final record count unchanged');

  console.groupEnd();
  return 'smoke test completed';
}