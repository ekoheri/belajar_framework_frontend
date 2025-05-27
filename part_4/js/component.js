import { TemplateEngine } from "./template_engine.js";

export class Component {
  constructor({ selector, state, template, methods = {}, di, onMount }) {
    this.root = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!this.root) throw new Error(`Component root element '${selector}' not found`);

    this.state = typeof state === 'function' ? state() : { ...state };
    this.di = di;
    this.template = template;
    this.methods = methods;

    // Bind semua method ke state agar bisa dipakai di template
    for (const name in methods) {
      this.state[name] = methods[name].bind(this);
    }

    this.render();
    this.engine = new TemplateEngine(this.state, this.root, di);
    this.attachEvents();

    if (typeof onMount === 'function') {
      onMount.call(this);
    }
  }

  render() {
    this.root.innerHTML = this.template(this.state);
  }

  attachEvents() {
    const actions = this.root.querySelectorAll('[data-action]');
    actions.forEach(el => {
      const methodName = el.getAttribute('data-action');
      const method = this.state[methodName];
      if (typeof method === 'function') {
        el.addEventListener('click', method);
      }
    });
  }

  set(key, value) {
    this.state[key] = value;
    this.render();
    this.engine.updateBindings(this.state);
    this.attachEvents(); // harus dipasang ulang
  }
}
