import { Component } from '../component.js';
import { waktuComponent } from './waktu.js';
import { biodataComponent } from './biodata.js';
import { formulirComponent } from './formulir.js';
import { counterComponent } from './counter.js';

export const aboutComponent = (container) => {
    const template = `
        <h3>About</h3>
        <div id="waktuComponent" class="component"></div>
        <div id="biodataComponent" class="component"></div>
        <div id="counterComponent" class="component"></div>
        <div id="formulirComponent" class="component"></div>
    `;
  
    return new Component({
        selector: '#app',
        state: () => ({ count: 0 }),
        template: () => template,
        di: container,
        onMount: () => {
            waktuComponent(container);
            biodataComponent(container);
            counterComponent(container);
            formulirComponent(container);
        }
    });
  };