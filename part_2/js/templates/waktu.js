import { Component } from '../component.js';
export const waktuComponent = (container) => {
    const template = `
      <h3>Waktu Sekarang</h3>
      <p>Waktu sekarang: <span data-bind="today"></span></p>
    `;
  
    const comp = new Component({
      selector: '#waktuComponent',
      state: () => ({
        today: container.get('clockService').now(),
      }),
      template: () => template,
      di: container
    });
  
    // Update waktu setiap detik
    setInterval(() => {
      comp.set('today', container.get('clockService').now());
    }, 1000);
  
    return comp;
  };
  