import { localStorageAdapter as adapter } from './adapters/localStorageAdapter.js';
import { SEED_LANGUAGES } from './seed.js';

const VALID_STATUSES = ['living', 'legacy', 'dormant'];

function validate(data) {
  if (!data || typeof data.name !== 'string' || !data.name.trim()) {
    throw new Error('Language.name is required');
  }
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    throw new Error(`Language.status must be one of: ${VALID_STATUSES.join(', ')}`);
  }
}

export const languageService = {
  async getAll() {
    return adapter.selectAll();
  },

  async getById(id) {
    return adapter.selectById(id);
  },

  async getLiving() {
    const all = await adapter.selectAll();
    return all.filter((lang) => lang.status === 'living');
  },

  async getEvolutionTimeline() {
    const all = await adapter.selectAll();
    return [...all].sort((a, b) => a.year_created - b.year_created);
  },

  async getStats() {
    const all = await adapter.selectAll();
    return {
      total: all.length,
      living: all.filter((l) => l.status === 'living').length,
      legacy: all.filter((l) => l.status === 'legacy').length,
      dormant: all.filter((l) => l.status === 'dormant').length,
    };
  },

  async create(data) {
    validate(data);
    return adapter.insert({ status: 'living', paradigm: [], descendants: [], ...data });
  },

  async update(id, patch) {
    if (patch.status && !VALID_STATUSES.includes(patch.status)) {
      throw new Error(`Language.status must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    return adapter.update(id, patch);
  },

  async remove(id) {
    return adapter.remove(id);
  },

  async seedIfEmpty() {
    return adapter.seed(SEED_LANGUAGES);
  },
};