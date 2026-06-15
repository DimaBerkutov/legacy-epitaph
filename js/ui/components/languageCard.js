import { el } from '../dom.js';

const STATUS_LABEL = { living: 'Living', legacy: 'Legacy', dormant: 'Dormant' };

export function languageCard(lang) {
  const head = el('div', { class: 'lang-card__head' }, [
    el('h3', { class: 'lang-card__name' }, lang.name),
    el('span', { class: `badge badge--${lang.status}` }, STATUS_LABEL[lang.status] ?? lang.status),
  ]);

  const meta = el('div', { class: 'lang-card__meta' },
    `${lang.creator} · ${lang.year_created}`);

  const epitaph = el('p', { class: 'lang-card__epitaph' }, `«${lang.epitaph}»`);

  const chips = el('div', { class: 'chips' },
    (lang.paradigm ?? []).map((p) => el('span', { class: 'chip' }, p)));

  const pop = el('div', {}, [
    el('div', { class: 'lang-card__meta' }, `Popularity: ${lang.popularity}`),
    el('div', { class: 'popbar' }, [
      el('div', { class: 'popbar__fill', style: `width:${Math.max(0, Math.min(100, lang.popularity))}%` }),
    ]),
  ]);

  return el('article', { class: 'lang-card' }, [head, meta, epitaph, chips, pop]);
}