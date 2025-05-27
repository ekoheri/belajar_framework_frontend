import { DIContainer } from './container.js'
import { Router } from './router.js';
import { Ajax } from './ajax.js';
import { homeComponent } from './templates/home.js';
import { aboutComponent } from './templates/about.js';

const container = new DIContainer();
container.register('clockService', () => ({
  now: () => new Date().toLocaleTimeString()
}));

container.register('ajax', () => {
  const ajax = new Ajax();
  ajax.ContainerLoading = document.querySelector('#app');
  return ajax;
});

// Routing
const routes = {
  home: (el) => homeComponent(container),
  about: (el) => aboutComponent(container)
};

new Router(routes);
