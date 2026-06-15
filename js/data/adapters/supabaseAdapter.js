const TABLE = 'languages';

export const supabaseAdapter = {
  async selectAll() {
    throw new Error('supabaseAdapter: клиент не инициализирован. Это заглушка на будущее.');
  },

  async selectById(id) {
    throw new Error('supabaseAdapter: клиент не инициализирован. Это заглушка на будущее.');
  },

  async insert(record) {
    throw new Error('supabaseAdapter: клиент не инициализирован. Это заглушка на будущее.');
  },

  async update(id, patch) {
    throw new Error('supabaseAdapter: клиент не инициализирован. Это заглушка на будущее.');
  },

  async remove(id) {
    throw new Error('supabaseAdapter: клиент не инициализирован. Это заглушка на будущее.');
  },

  async seed() {
    return false;
  },
};