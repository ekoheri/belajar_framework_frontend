export class TemplateEngine {
    constructor(state, rootElement, di) {
      this.state = state;
      this.root = rootElement;
      this.di = di;
  
      // Inject dependency ke state
      for (const key in di.factories) {
        Object.defineProperty(this.state, key, {
          get: () => di.get(key)
        });
      }
  
      this.initBindings();
      this.updateView();
    }
  
    initBindings() {
      // Sinkronisasi input (data-model) → state
      const inputs = this.root.querySelectorAll('[data-model]');
      inputs.forEach(input => {
        const key = input.getAttribute('data-model');
        const updateModel = () => {
          if (input.type === 'checkbox') {
            this.state[key] = input.checked;
          } else if (input.type === 'radio') {
            if (input.checked) {
              this.state[key] = input.value;
            }
          } else {
            this.state[key] = input.value;
          }
          this.updateView(); // update tampilan setelah perubahan
        };
  
        input.addEventListener('input', updateModel);
        input.addEventListener('change', updateModel);
      });
    }
  
    updateView() {
      // data-bind: tampilkan nilai state
      const bound = this.root.querySelectorAll('[data-bind]');
      bound.forEach(el => {
        const expr = el.getAttribute('data-bind');
        try {
          const func = new Function(...Object.keys(this.state), `return ${expr}`);
          el.textContent = func(...Object.values(this.state));
        } catch {
          el.textContent = '';
        }
      });
  
      // Sinkronisasi nilai state → input (data-model)
      const inputs = this.root.querySelectorAll('[data-model]');
      inputs.forEach(input => {
        const key = input.getAttribute('data-model');
        const value = this.state[key];
        if (input.type === 'radio') {
          input.checked = input.value === value;
        } else if (document.activeElement !== input) {
          input.value = value || '';
        }
      });
    }
  
    updateBindings(newState) {
      this.state = newState;
      this.updateView();
      this.initBindings(); // wajib pasang ulang input handler
    }
  
    set(key, value) {
      this.state[key] = value;
      this.updateView();
    }
  }
  