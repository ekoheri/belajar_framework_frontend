export class Router {
    constructor(routes, outletSelector = '#app') {
      this.routes = routes;
      this.outlet = document.querySelector(outletSelector);
      
      // Tambahkan ini: jika hash kosong, arahkan ke #home
      if (!location.hash) {
        location.hash = '#home';
      }
      window.addEventListener('hashchange', () => this.loadRoute());
      window.addEventListener('DOMContentLoaded', () => this.loadRoute());
    }
  
    loadRoute() {
      const path = location.hash.replace('#', '') || 'home';
      const route = this.routes[path];
  
      if (route) {
        this.outlet.innerHTML = ''; // Clear old view
        route(this.outlet);         // Render new component
      } else {
        this.outlet.innerHTML = '<h2>404 - Not Found</h2>';
      }
    }
  }
  