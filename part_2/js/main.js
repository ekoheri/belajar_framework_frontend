import { DIContainer } from './container.js'

import { waktuComponent } from './templates/waktu.js';
import { biodataComponent } from './templates/biodata.js';
import { counterComponent } from './templates/counter.js';
import { formulirComponent } from './templates/formulir.js';

const container = new DIContainer();
container.register('clockService', () => ({
  now: () => new Date().toLocaleTimeString()
}));

waktuComponent(container);
biodataComponent(container);
counterComponent(container);
formulirComponent(container);
