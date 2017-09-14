import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'animate.css/animate.min.css'
import 'assets/styl/index.styl'

Vue.use(MintUI)
Vue.use(Resource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
