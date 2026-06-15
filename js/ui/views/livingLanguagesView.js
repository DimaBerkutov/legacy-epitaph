import { el, mount } from '../dom.js';
import { languageService } from '../../../data/languageService.js';
import { languageCard } from '../../components/languageCard.js';

export async function livingLanguagesView() {
  const languages = await languageService.getLiving();

  const paradigms = [...new Set(languages.flatMap((l) => l.paradigm ?? []))].sort();

  const state = { sort: 'popularity', paradigm: 'all' };

  const grid = el('div', { class: 'card-grid' });

  function applyAndRender() {
    let list = languages.slice();
    if (state.paradigm !== 'all') {
      list = list.filter((l) => (l.paradigm ?? []).includes(state.paradigm));
    }
    list.sort((a, b) =>
      state.sort === 'year' ? a.year_created - b.year_created : b.popularity - a.popularity);

    if (list.length === 0) {
      mount(grid, el('p', { class: 'state-msg' }, 'No results match this filter.'));
    } else {
      mount(grid, list.map(languageCard));
    }
  }

  const sortSelect = el('select', {
    onChange: (e) => { state.sort = e.target.value; applyAndRender(); },
  }, [
    el('option', { value: 'popularity' }, 'By popularity'),
    el('option', { value: 'year' }, 'By year'),
  ]);

  const paradigmSelect = el('select', {
    onChange: (e) => { state.paradigm = e.target.value; applyAndRender(); },
  }, [
    el('option', { value: 'all' }, 'All paradigms'),
    ...paradigms.map((p) => el('option', { value: p }, p)),
  ]);

  const toolbar = el('div', { class: 'toolbar' }, [
    el('div', {}, [el('label', {}, 'Sort by:'), sortSelect]),
    el('div', {}, [el('label', {}, 'Paradigm:'), paradigmSelect]),
  ]);

  applyAndRender();

  return el('div', {}, [
    el('h2', {}, 'Living Languages'),
    el('p', { class: 'muted' }, 'Languages that are alive and actively used today.'),
    toolbar,
    grid,
  ]);
}