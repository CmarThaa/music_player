import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import piniaPluginPersist from 'pinia-plugin-persist'

import App from './layout/Main.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)

const store = createPinia()
store.use(piniaPluginPersist)
app.use(store)

app.mount('#app')
