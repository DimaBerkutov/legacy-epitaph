import { el, mount } from '../dom.js';

const LINKS = [
  { href: '#/', label: 'Home' },
  { href: '#/living', label: 'Living Languages' },
  { href: '#/evolution', label: 'Evolution' },
];

export function renderNavbar(container, currentHash) {
  const normalized = currentHash || '#/';
  const links = LINKS.map((link) => {
    const isActive =
      link.href === '#/' ? normalized === '#/' || normalized === '' : normalized.startsWith(link.href);
    return el('a', {
      href: link.href,
      class: 'navbar__link' + (isActive ? ' is-active' : ''),
    }, link.label);
  });
  mount(container, links);
}