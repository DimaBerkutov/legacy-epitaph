const STORAGE_KEY = 'legacy_epitaph_languages';

function readTable() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeTable(rows) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

function genId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

export const localStorageAdapter = {
  async selectAll() {
    return readTable();
  },

  async selectById(id) {
    return readTable().find((row) => row.id === id) ?? null;
  },

  async insert(record) {
    const rows = readTable();
    const row = {
      ...record,
      id: record.id ?? genId(),
      created_at: record.created_at ?? new Date().toISOString(),
    };
    rows.push(row);
    writeTable(rows);
    return row;
  },

  async update(id, patch) {
    const rows = readTable();
    const idx = rows.findIndex((row) => row.id === id);
    if (idx === -1) throw new Error(`Language с id="${id}" не найден`);
    rows[idx] = { ...rows[idx], ...patch, id };
    writeTable(rows);
    return rows[idx];
  },

  async remove(id) {
    const rows = readTable().filter((row) => row.id !== id);
    writeTable(rows);
  },

  async seed(records) {
    if (readTable().length > 0) return false;
    const now = new Date().toISOString();
    const rows = records.map((rec) => ({
      ...rec,
      id: rec.id ?? genId(),
      created_at: rec.created_at ?? now,
    }));
    writeTable(rows);
    return true;
  },
};