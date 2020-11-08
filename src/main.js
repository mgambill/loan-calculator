import { createApp } from "vue"
import Cleave from "vue-cleave-component"
import App from "./App.vue"
//import router from "./router"
//import store from "./store"
console.log(Cleave)
import "./assets/styles/tailwind.css"

createApp(App)
  .use(Cleave)
  //  .use(store)
  //  .use(router)
  .mount("#app")
