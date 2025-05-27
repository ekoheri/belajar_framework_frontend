import { Component } from '../component.js';

export const homeComponent = (container) => {
  const ajax = container.get('ajax');
  return new Component({
    selector: '#app',
    state: () => ({
      name: 'Eko',
      posts : [] 
    }),
    template: (state) => `
      <h2>Welcome Page</h2>
      <p>Hello, <span data-bind="name"></span>!</p>
      <input type="text" data-model="name" placeholder="Your name">
      <h3>List of Posts:</h3>
      <ul>
        ${
          state.posts.length > 0
            ? state.posts.map(post => `
                <li>
                  <strong>${post.title}</strong><br>
                  <small>${post.body}</small>
                </li>
              `).join('')
            : '<li>Loading posts...</li>'
        }
      </ul>
    `,
    methods: {
      loadPosts() {
        const self = this;
        ajax.sendRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            const data = JSON.parse(response);
            self.set('posts', data);
          })
          .catch(err => {
            console.error('Failed to fetch posts:', err);
          });
      }
    },
    di: container,
    onMount() {
      this.state.loadPosts();
    }
  });
};
