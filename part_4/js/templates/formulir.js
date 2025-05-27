import { Component } from '../component.js';
export const formulirComponent = (container) => {
    const template = `
      <h2>Formulir Masukan</h2>
      <p>Catatan: <br>
        <textarea data-model="note" rows="3" cols="40"></textarea>
      </p>
      <p>Isi catatan: <em><span data-bind="note"></span></em></p>
      <p>Pilihan:
        <select data-model="choice">
          <option value="a">Pilihan A</option>
          <option value="b">Pilihan B</option>
          <option value="c">Pilihan C</option>
        </select>
      </p>
      <p>Kamu memilih: <strong><span data-bind="choice"></span></strong></p>
    `;
  
    return new Component({
      selector: '#formulirComponent',
      state: () => ({
        note: '',
        choice: 'a'
      }),
      template: () => template,
      di: container
    });
  };
  