import { Component } from '../component.js';
export const counterComponent = (container) => {
    const template = `
      <h3>Counter</h3>
      <p>Nilai: <span data-bind="count"></span></p>
      <button data-action="inc">+</button>
      <button data-action="dec">-</button>
    `;
  
    return new Component({
      selector: '#counterComponent',
      state: () => ({ count: 0 }),
      template: () => template,
      methods: {
        inc() { this.set('count', this.state.count + 1); },
        dec() { this.set('count', this.state.count - 1); }
      },
      di: container
    });
  };
  