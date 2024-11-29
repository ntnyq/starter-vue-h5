import '@unocss/reset/tailwind.css'
import 'uno.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import 'vant/es/toast/style'
import 'vant/es/notify/style'

const app = createApp(App)

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
