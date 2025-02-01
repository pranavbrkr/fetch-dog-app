import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

const app = createApp(App)
axios.defaults.withCredentials = true

app.use(router)
app.use(vuetify)

app.mount('#app')
