import { el } from '../dom.js';

const STATUS_LABEL = { living: 'Living', legacy: 'Legacy', dormant: 'Dormant' };

export function timelineItem(lang) {
  const children = [
    el('span', { class: 'tl-item__dot' }),
    el('div', { class: 'tl-item__year' }, String(lang.year_created)),
    el('div', { class: 'tl-item__name' }, [
      lang.name,
      ' ',
      el('span', { class: `badge badge--${lang.status}` }, STATUS_LABEL[lang.status] ?? lang.status),
      lang.year_deprecated ? el('span', { class: 'tl-item__epitaph' }, ` † ${lang.year_deprecated}`) : null,
    ]),
    el('p', { class: 'tl-item__epitaph' }, `«${lang.epitaph}»`),
  ];

  if (lang.descendants && lang.descendants.length) {
    children.push(
      el('div', { class: 'tl-item__descendants' }, `Descendants: ${lang.descendants.join(', ')}`),
    );
  }

  return el('li', { class: `tl-item tl-item--${lang.status}` }, children);
}