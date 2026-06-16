import { el } from '../dom.js';
import { languageService } from '../../data/languageService.js';

export async function homeView() {
  const stats = await languageService.getStats();

  const hero = el('section', { class: 'hero' }, [
    el('h1', {}, 'Legacy Epitaph'),
    el('p', { class: 'hero__lead' },
      'Memorial to programming languages: those that live, those that passed, ' +
      'and whose legacy we write every day.',
    ),
  ]);

  const statsBlock = el('section', { class: 'stats' }, [
    statCard(stats.total, 'Total Languages'),
    statCard(stats.living, 'Living'),
    statCard(stats.legacy, 'Legacy'),
    statCard(stats.dormant, 'Dormant'),
  ]);

  const cta = el('section', { class: 'cta-grid' }, [
    el('a', { class: 'cta-card', href: '#/living' }, [
      el('h3', {}, 'Living Languages →'),
      el('p', { class: 'muted' }, 'Languages that are alive today. Filter by paradigm.'),
    ]),
    el('a', { class: 'cta-card', href: '#/evolution' }, [
      el('h3', {}, 'Evolution →'),
      el('p', { class: 'muted' }, 'Chronology of births and epitaphs—from Fortran to Rust.'),
    ]),
  ]);

  return el('div', {}, [hero, statsBlock, cta]);
}

function statCard(num, label) {
  return el('div', { class: 'stat' }, [
    el('div', { class: 'stat__num' }, String(num)),
    el('div', { class: 'stat__label' }, label),
  ]);
}