import { Component } from '../../../part_2/js/component.js';

export const homeComponent = (container) => {
  return new Component({
    selector: '#app',
    state: () => ({ name: 'Guest' }),
    template: (state) => `
      <h2>Welcome Page</h2>
      <p>Hello, <span data-bind="name"></span>!</p>
      <input type="text" data-model="name" placeholder="Your name">
    `,
    di: container
  });
};
