import { Component } from '../component.js';
export const biodataComponent = (container) => {
    const template = `
      <h3>Biodata</h3>
      <p>Nama: <input type="text" data-model="name" /></p>
      <p>Halo, <span data-bind="name"></span></p>
      <p>Gender:</p>
      <label><input type="radio" name="gender" value="L" data-model="gender" /> Laki-laki</label>
      <label><input type="radio" name="gender" value="P" data-model="gender" /> Perempuan</label>
      <p>Gender yang dipilih: <strong><span data-bind="gender"></span></strong></p>
      <p>Score sekarang: <span data-bind="score"></span></p>
      <button data-action="increaseScore">Tambah Score</button>
    `;
  
    return new Component({
      selector: '#biodataComponent',
      state: () => ({
        name: 'Eko',
        score: 90,
        gender: 'L'
      }),
      template: () => template,
      methods: {
        increaseScore() {
          this.set('score', this.state.score + 10);
        }
      },
      di: container
    });
  };
  