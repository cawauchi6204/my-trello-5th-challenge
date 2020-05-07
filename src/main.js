import Vue from 'vue'
import App from './App.vue'
// main.jsにstoreをimportしないとvuexが使えない！！！
// まずは main.js から全て始まります。
// このようにアプリケーションの最初に読み込まれて、実行される部分をエントリーポイントと呼びます。
// ここから全ての Vue アプリケーションがスタートします。
import store from './store/index'
import './assets/styles/style.css'

Vue.config.productionTip = false

// new Vueにもちゃんとstoreを入れないと動かない
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

