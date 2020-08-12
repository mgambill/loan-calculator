<template lang="pug">

a.float-right.relative.text-green-500(href="http://github.com/mgambill/loan-calculator" target="_blank" class="hover:text-green-400")
    svg.w-16.h-16( aria-hidden="true" viewBox="0 0 200 200")
      polygon(fill="currentColor" points="0,0 200,0 200,200")
    div.absolute.top-0.right-0.p-2: svg.w-6.h-6.text-white( aria-hidden="true" viewBox="0 0 496 512")
      path(fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z")
div.p-4: h1.text-3xl.font-bold.text-green-600 Loan Calculation
div.grid.grid-cols-4.gap-6.p-4.h-full
  .col-span-1.space-y-4
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="principle") Loan amount/balance
      .mt-1.relative.rounded-md.shadow-sm
        .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none: span.text-gray-500(class="sm:text-sm sm:leading-5") $
        input#principle.form-input.block.w-full.pl-7.pr-12( v-model.number="balance" placeholder="3500" class="sm:text-sm sm:leading-5")
  
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="rate") Annual Interest rate
      .mt-1.flex.rounded-md.shadow-sm
        input#rate.form-input.flex-1.block.w-full.px-3.py-2.rounded-none.rounded-l-md( v-model.number="rate" placeholder="5 %" class="sm:text-sm sm:leading-5")
        span.inline-flex.items-center.px-3.rounded-r-md.border.border-l-0.border-gray-300.bg-gray-50.text-gray-500(class="sm:text-sm") %
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="minimum") Minimum monthly payment
      div#principle.leading-5.flex-1.block.w-full.py-2.text-xl.text-gray-600 {{ currency(pmt) }}
  
    div
      label.block.text-sm.leading-5.font-medium.text-gray-700(for="duration") Loan duration
      .mt-1.relative.rounded-md.shadow-sm
        input#duration.form-input.block.w-full.pr-14(placeholder="0.00" class="sm:text-sm sm:leading-5" v-model="duration")
        .absolute.inset-y-0.right-0.flex.items-center
          select.form-select.h-full.py-0.pl-2.pr-8.border-transparent.bg-transparent.text-gray-500( v-model="durationType" aria-label="As months or years" class="sm:text-sm sm:leading-5")
            option(value="M") Months
            option(value="Y") Years
      p.text-xs.text-gray-500 Months: {{ months }}

    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="maximum") Custom monthly payment
      .mt-1.relative.rounded-md.shadow-sm
        .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none: span.text-gray-500(class="sm:text-sm sm:leading-5") $
        input#maximum.form-input.block.w-full.pl-7.pr-12( v-model.number="max" placeholder="3500" class="sm:text-sm sm:leading-5")
 
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
            tbody.bg-white
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
import { currency, round, nper, pmt } from "./helpers"
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
  watch: {
    durationType(t) {
      const d = this.duration
      const m = this.months
      console.log("watch", t, d, m)
      if (t === "M") this.duration = this.months * 12
      else this.duration = this.duration / 12
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

<style>
#app {
  @apply min-h-screen bg-gray-100 overflow-hidden;
}
.angle:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 24px solid transparent;
  border-right: 24px solid transparent;
  border-bottom: 24px solid black;
}
</style>
