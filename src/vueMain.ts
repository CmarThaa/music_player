import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)

const store = createPinia()
store.use(piniaPluginPersist)
app.use(store)
app.use(router)

app.mount('#app')
