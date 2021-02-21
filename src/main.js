import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
import 'lib-flexible'

const app = createApp(App)
app.config.globalProperties.$bus = mitt()
app.use(store).use(router).mount('#app')
