//import { nextTick } from 'vue'
//import Cleave from "cleave.js"
const n = v => v.replace(/\D/g, "")
export default {
  mounted(el) {
    el.value = new Intl.NumberFormat().format(n(el.value))
  },
  updated(el) {
    el.value = new Intl.NumberFormat().format(n(el.value))
  }
}
