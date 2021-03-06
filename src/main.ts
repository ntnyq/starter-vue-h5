import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import 'vant/es/toast/style'
import 'vant/es/notify/style'
import '@/styles/style.scss'

const app = createApp(App)

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
