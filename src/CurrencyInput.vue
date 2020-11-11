<template lang="pug">
input(v-currency v-model.lazy="localValue")
</template>

<script>
import { currency as c, clean as n } from "./helpers"
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    cents: Boolean,
    prefix: Boolean
  },
  directives: {
    currency: {
      mounted(el, binding) {
        if (binding.instance.modelValue === null) return
        el.value = c(el.value, binding.instance.prefix)
      },
      updated(el, binding) {
        if (binding.instance.modelValue === null) return
        el.value = c(el.value, binding.instance.prefix)
      }
    }
  },
  data() {
    return {
      localValue: c(this.modelValue)
    }
  },
  watch: {
    localValue(value) {
      this.$emit("update:modelValue", n(c(value)))
    }
  }
}
</script>
