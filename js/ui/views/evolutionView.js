import { el } from '../dom.js';
import { languageService } from '../../../data/languageService.js';
import { timelineItem } from '../../components/timelineItem.js';

export async function evolutionView() {
  const languages = await languageService.getEvolutionTimeline();

  const timeline = el('ol', { class: 'timeline' }, languages.map(timelineItem));

  return el('div', {}, [
    el('h2', {}, 'Evolution'),
    el('p', { class: 'muted' },
      'Language chronology—from first births to epitaphs. Node color reflects status: ' +
      'green = living, gray = legacy, orange = dormant.',
    ),
    timeline,
  ]);
}