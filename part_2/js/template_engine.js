export class TemplateEngine {
    constructor(state, rootElement, di) {
        this.state = state;
        this.root = rootElement;
        this.di = di;

        for (const key in di.factories) {
            Object.defineProperty(this.state, key, {
                get: () => di.get(key)
            });
        }
  
        this.initBindings();
        this.updateView();
    }
  
    initBindings() {
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
            this.updateView();
        };

        input.addEventListener('input', updateModel);
        input.addEventListener('change', updateModel);
        });
    }
  
    updateView() {
        // Update data-bind (output)
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
  
    set(key, value) {
        this.state[key] = value;
        this.updateView();
    }
}