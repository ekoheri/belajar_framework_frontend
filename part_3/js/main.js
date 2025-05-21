import { DIContainer } from './container.js'
import { Router } from './router.js';
import { homeComponent } from './templates/home.js';
import { aboutComponent } from './templates/about.js';

const container = new DIContainer();
container.register('clockService', () => ({
  now: () => new Date().toLocaleTimeString()
}));

// Routing
const routes = {
  home: (el) => homeComponent(container),
  about: (el) => aboutComponent(container)
};

new Router(routes);
