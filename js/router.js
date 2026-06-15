import { mount, el } from './ui/dom.js';
import { renderNavbar } from './ui/components/navbar.js';

const routes = new Map();
let outlet;
let navContainer;

export const router = {
  add(hash, viewFn) {
    routes.set(hash, viewFn);
    return this;
  },

  init({ root, nav }) {
    outlet = root;
    navContainer = nav;
    window.addEventListener('hashchange', () => this.render());
    this.render();
  },

  async render() {
    const hash = location.hash || '#/';
    renderNavbar(navContainer, hash);

    const viewFn = routes.get(hash) ?? routes.get('#/');
    mount(outlet, el('p', { class: 'state-msg' }, 'Loading…'));

    try {
      const node = await viewFn();
      mount(outlet, node);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('[router] render error:', err);
      mount(outlet, el('p', { class: 'state-msg' }, 'Failed to load page. See console.'));
    }
  },
};
