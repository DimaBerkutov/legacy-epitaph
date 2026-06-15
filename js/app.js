import { languageService } from './data/languageService.js';
import { router } from './router.js';
import { homeView } from './ui/views/homeView.js';
import { livingLanguagesView } from './ui/views/livingLanguagesView.js';
import { evolutionView } from './ui/views/evolutionView.js';

async function bootstrap() {
  await languageService.seedIfEmpty();

  router
    .add('#/', homeView)
    .add('#/living', livingLanguagesView)
    .add('#/evolution', evolutionView);

  router.init({
    root: document.getElementById('app-root'),
    nav: document.getElementById('navbar'),
  });
}

bootstrap().catch((err) => {
  console.error('[app] fatal initialization error:', err);
  const root = document.getElementById('app-root');
  if (root) root.textContent = 'Application initialization error. See console.';
});