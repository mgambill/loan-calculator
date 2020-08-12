<template lang="pug">

div.grid.grid-cols-4.gap-6.p-4.h-full
  .col-span-1.space-y-4
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="principle") Loan amount/balance
      .mt-1.relative.rounded-md.shadow-sm
        .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none: span.text-gray-500(class="sm:text-sm sm:leading-5") $
        input#duration.form-input.block.w-full.pl-7.pr-12( v-model.number="balance" placeholder="3500" class="sm:text-sm sm:leading-5")
  
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="rate") Annual Interest rate
      .mt-1.flex.rounded-md.shadow-sm
        input#rate.form-input.flex-1.block.w-full.px-3.py-2.rounded-none.rounded-l-md( v-model.number="rate" placeholder="5 %" class="sm:text-sm sm:leading-5")
        span.inline-flex.items-center.px-3.rounded-r-md.border.border-l-0.border-gray-300.bg-gray-50.text-gray-500(class="sm:text-sm") %
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="minimum") Minimum monthly payment
      div#principle.leading-5.flex-1.block.w-full.px-3.py-2.text-gray-600 {{ currency(pmt) }}
  
    div
      label.block.text-sm.leading-5.font-medium.text-gray-700(for="duration") Loan duration
      .mt-1.relative.rounded-md.shadow-sm        
        input#duration.form-input.block.w-full.pr-14(placeholder="0.00" class="sm:text-sm sm:leading-5" v-model="duration")
        .absolute.inset-y-0.right-0.flex.items-center
          select.form-select.h-full.py-0.pl-2.pr-8.border-transparent.bg-transparent.text-gray-500( v-model="durationType" aria-label="As months or years" class="sm:text-sm sm:leading-5")
            option(value="M") Months
            option(value="Y") Years
      p.text-sm.text-gray-500.font-weight-bold Months: {{ months }}

    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="maximum") Custom monthly payment
      .mt-1.flex.rounded-md.shadow-sm
        span.inline-flex.items-center.px-3.rounded-l-md.border.border-r-0.border-gray-300.bg-gray-50.text-gray-500(class="sm:text-sm") $
        input#maximum.form-input.flex-1.block.w-full.px-3.py-2.rounded-none.rounded-r-md( v-model.number="max" placeholder="3500" class="sm:text-sm sm:leading-5")
 
  //-pre  {{ { $data, pmt, minResult, min } }}
  .col-span-3
    .flex.flex-col.mt-6
      .-my-2.py-2.overflow-x-auto(class="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8")
        .align-middle.inline-block.min-w-full.shadow.overflow-hidden.border-b.border-gray-200(class="sm:rounded-lg")
          table.min-w-full.divide-y.divide-gray-200
            thead
              tr
                th.px-6.py-3.bg-gray-50.text-left.text-xs.leading-4.font-medium.text-gray-500.uppercase.tracking-wider Payment details
                th.px-6.py-3.bg-gray-50.text-left.text-xs.leading-4.font-medium.text-gray-500.uppercase.tracking-wider Minimum monthly payment
                th.px-6.py-3.bg-gray-50.text-left.text-xs.leading-4.font-medium.text-gray-500.uppercase.tracking-wider Custom monthly payment
            tbody
              tr.border-b.border-gray-200
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.font-medium.text-gray-900 Payment
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ currency(min) }}
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ currency(max) }}
              tr.border-b.border-gray-200
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.font-medium.text-gray-900 Total interest paid
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ minResult.totalInterest }}
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ maxResult.totalInterest }}
              tr.border-b.border-gray-200
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.font-medium.text-gray-900 Average monthly interest paid
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ minResult.monthlyAverage }}
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ maxResult.monthlyAverage }}
              tr.border-b.border-gray-200
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.font-medium.text-gray-900 Total paid for the loan
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ minResult.total }}
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ maxResult.total }}
          
              tr.border-b.border-gray-200
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.font-medium.text-gray-900 Number of monthly payments
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ minResult.months }}
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ maxResult.months }}
              tr
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.font-medium.text-gray-900 Estimated payoff date
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ timespan(minResult) }}
                td.px-6.py-4.whitespace-no-wrap.text-sm.leading-5.text-gray-500 {{ timespan(maxResult) }}

</template>
<script>
import { currency, round, nper, pmt } from "../helpers"
export default {
  data() {
    return {
      balance: 3500,
      rate: 8,
      max: 300,
      duration: 36,
      durationType: "M",
      mode: "duration"
    }
  },
  computed: {
    months() {
      return this.durationType === "M" ? this.duration : this.duration * 12
    },
    minResult() {
      return this.calc(this.balance, this.rate, this.min)
    },
    maxResult() {
      return this.calc(this.balance, this.rate, this.max)
    },
    pmt() {
      return pmt(this.balance, this.rate, this.months)
    },
    min() {
      return this.pmt
    }
  },
  methods: {
    timespan(item) {
      const plural = (cnt, term) => `${cnt} ${cnt === 1 ? term : term + "s"} `
      const years = Math.floor(item.months / 12)
      const months = item.months % 12

      const y = years > 0 ? plural(years, "year") : null
      const m = months > 0 ? plural(months, "month") : null

      return ["in", y, y && m && "and", m].filter(x => x !== null).join(" ")
    },
    currency(value, prefix) {
      if (isNaN(value)) return null
      return currency(value, prefix)
    },
    round(value, decimals = 3) {
      return round(value, decimals)
    },
    //https://www.thecalculator.co/finance/Loan-Interest-Calculator-527.html
    calc(principle, rate, payment) {
      const n = nper(principle, rate, payment)
      // Total interest
      var a = n * payment - principle
      // Average monthly interest paid
      var b = (n * payment - principle) / n
      // Total paid for the loan
      var c = n * payment
      // Number of monthly payments
      var d = n

      return { totalInterest: currency(a), monthlyAverage: currency(b), total: currency(c), months: Math.floor(d), nper }
    }
  }
}
</script>
