// === Smoke-тест Data Layer ===
// НЕ подключается в index.html. Запуск вручную из DevTools-консоли:
//   import('./js/data/__smoke.js').then(m => m.runSmoke());
// Проверяет CRUD-цикл сервиса и базовые инварианты. Логирует ассерты.
import { languageService } from './languageService.js';

function assert(cond, msg) {
  if (cond) console.log('%c✓', 'color:#4CAF7D', msg);
  else console.error('✗', msg);
  return cond;
}

export async function runSmoke() {
  console.group('Legacy Epitaph — smoke-тест Data Layer');

  await languageService.seedIfEmpty();
  const before = await languageService.getAll();
  assert(before.length > 0, `seed наполнил хранилище (${before.length} записей)`);

  const living = await languageService.getLiving();
  assert(living.every((l) => l.status === 'living'), 'getLiving() возвращает только living');

  const timeline = await languageService.getEvolutionTimeline();
  const sorted = timeline.every((l, i) => i === 0 || timeline[i - 1].year_created <= l.year_created);
  assert(sorted, 'getEvolutionTimeline() отсортирован по year_created');

  // create → getById → update → remove
  const created = await languageService.create({
    name: '__TestLang__', status: 'living', year_created: 2024, popularity: 1, epitaph: 'temp',
  });
  assert(created.id && created.created_at, 'create() выдал id и created_at');

  const fetched = await languageService.getById(created.id);
  assert(fetched && fetched.name === '__TestLang__', 'getById() находит созданную запись');

  const updated = await languageService.update(created.id, { popularity: 42 });
  assert(updated.popularity === 42, 'update() меняет поле');

  await languageService.remove(created.id);
  const gone = await languageService.getById(created.id);
  assert(gone === null, 'remove() удаляет запись');

  const after = await languageService.getAll();
  assert(after.length === before.length, 'итоговое число записей не изменилось');

  console.groupEnd();
  return 'smoke-тест завершён';
}
