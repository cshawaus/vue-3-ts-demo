import { createApp } from 'vue'

import App from '@c/App.vue'

createApp(App).mount('#app')

if (module.hot) {
  module.hot.accept()
}