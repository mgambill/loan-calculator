<template lang="pug">
div.px-3.py-4.bg-gray-50.text-left.text-xs.leading-4.font-medium.text-gray-500.uppercase.tracking-wider.border-r.border-r-dashed {{ label }}
div.border-t.border-r.border-r-dashed.px-3.py-4.text-gray-600.text-right  {{ item.balance }}
div.border-t.border-r.border-r-dashed
  template(v-if="editable")
    CurrencyInput.text-right.px-3.py-4.w-full.h-full(:prefix="true" v-model="down" :readonly="!editable" :placeholder="0" class="text-blue-500 bg-blue-50 hover:bg-blue-100")

  template(v-else)
    .px-3.py-4.text-gray-600.text-right  {{ currency(down) }}
div.border-t.border-r.border-r-dashed
  template(v-if="editable")
    CurrencyInput.text-right.px-3.py-4.w-full.h-full(:prefix="true" v-model="payment" :readonly="!editable" :placeholder="item.payment" class="text-blue-500 bg-blue-50 hover:bg-blue-100")
  template(v-else)
    .px-3.py-4.text-gray-600.text-right  {{ item.payment }}
div.border-t.border-r.border-r-dashed.px-3.py-4.text-gray-600.text-right  {{ item.totalInterest }}
div.border-t.border-r.border-r-dashed.px-3.py-4.text-gray-600.text-right  {{ item.monthlyAverage }}
div.border-t.border-r.border-r-dashed.px-3.py-4.text-gray-600.text-right  {{ item.total }}
div.border-t.border-r.border-r-dashed.px-3.py-4.text-gray-600  {{ item.months }}
div.border-t.border-r.border-r-dashed.px-3.py-4.text-gray-600  {{ item.ts }}

//-pre {{  { $data, months, principal, rate, item } }}

</template>

<script>
import CurrencyInput from "./CurrencyInput.vue"
import { currency, round, nper, pmt } from "./helpers"
export default {
  components: { CurrencyInput },
  props: {
    principal: [Number, String],
    rate: Number,
    months: Number,
    initialDuration: Number,
    def: { type: Object, default: () => ({}) },
    editable: {
      type: Boolean,
      default: true
    },
    cents: Boolean
  },
  data() {
    return {
      label: this.def.label ?? "Custom",
      down: this.def.down ?? 3000,
      max: 300,
      duration: 72,

      //cents: true,
      payment: null
    }
  },
  computed: {
    balance() {
      return this.principal - (this.down ?? 0)
    },
    item() {
      return this.calc("Orig Payment", this.balance, this.rate, this.payment, this.months) || {}
    },
    pmt() {
      return pmt(this.principal, this.rate, this.months)
    }
  },
  methods: {
    timespan(months) {
      if (months === 0) return null
      const plural = (cnt, term, display = true) => `${display ? `${cnt} ` : ""}${cnt === 1 ? term : term + "s"}`
      const _years = Math.floor(months / 12)
      const _months = Math.ceil(months % 12)
      const hy = _years > 0
      const hm = _months > 0
      const y = hy ? plural(_years, "year") : null
      const m = hm ? plural(_months, "month") : null

      //console.log( this.durationDetails(months) )

      return ["in", y, y && m && "and", m]
        .filter(x => x !== null)
        .join(" ")
        .trimRight()
    },
    currency(value, prefix) {
      if (isNaN(value)) return null
      return currency(value, prefix, this.cents ? 2 : 0)
    },
    round,
    //https://www.thecalculator.co/finance/Loan-Interest-Calculator-527.html
    calc(label, principal, rate, payment, duration) {
      const payModel = (interest, monthly, total, nper, duration, months, principal, rate, payment) => ({
        principal,
        label,
        balance: this.currency(principal),
        rate,
        payment: this.currency(payment),
        totalInterest: this.currency(interest),
        monthlyAverage: this.currency(monthly),
        total: this.currency(total),
        months: Math.ceil(months),
        duration,
        nper,
        ts: this.timespan(months),
        pmt: pmt(principal, rate, months)
      })
      if (payment === undefined || payment === null || payment === 0) payment = pmt(principal, rate, duration)
      //if (payment == 0) return { totalInterest: this.currency(0), monthlyAverage: this.currency(0), total: this.currency(0), months: 0, nper: 0, ts: 0 }
      else if (payment === 0) return payModel(0, 0, 0, 0, 0, principal, rate, payment)
      try {
        const n = nper(principal, rate, payment)
        // Total interest
        var a = n * payment - principal
        // Average monthly interest paid
        var b = (n * payment - principal) / n
        // Total paid for the loan
        var c = n * payment
        // Number of monthly payments
        var d = n

        const months = Math.floor(d)

        //return { totalInterest: this.currency(a), monthlyAverage: this.currency(b), total: this.currency(c), months, nper: n, ts: this.timespan(months) }
        return payModel(a, b, c, duration, months, n, principal, rate, payment)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
