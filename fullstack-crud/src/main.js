import { createApp } from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import routes from './routes/routes'

createApp(App).use(VueTheMask).use(routes).mount('#app')

