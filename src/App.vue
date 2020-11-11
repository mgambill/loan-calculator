<template lang="pug">

a.float-right.relative.text-green-500(href="http://github.com/mgambill/loan-calculator" target="_blank" class="hover:text-green-400")
    svg.w-16.h-16( aria-hidden="true" viewBox="0 0 200 200")
      polygon(fill="currentColor" points="0,0 200,0 200,200")
    div.absolute.top-0.right-0.p-2: svg.w-6.h-6.text-white( aria-hidden="true" viewBox="0 0 496 512")
      path(fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z")
div.p-4: h1.text-3xl.font-bold.text-green-600 Loan Calculation

div.p-4
  div.bg-white.rounded-md.shadow-md.p-4(class="space-y-4 md:space-x-4 md:space-y-0 md:grid md:grid-cols-3")
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="principal") Loan amount/balance
      .mt-1.relative.rounded-md.shadow-sm
        //-.absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none: span.text-gray-500(class="sm:text-sm sm:leading-5") $
        CurrencyInput.form-input.block.w-full.px-3.py-2.text-gray-600(class="sm:text-sm sm:leading-5" v-model="principal" placeholder="3500")
    div
      label.block.text-sm.font-medium.leading-5.text-gray-700(for="rate") Annual interest rate
      .mt-1.flex.rounded-md.shadow-sm
        input#rate.form-input.flex-1.block.w-full.px-3.py-2.rounded-none.rounded-l-md( v-model.number="rate" placeholder="5 %" class="sm:text-sm sm:leading-5")
        span.inline-flex.items-center.px-3.rounded-r-md.border.border-l-0.border-gray-300.bg-gray-50.text-gray-500(class="sm:text-sm") %

    div
      label.block.text-sm.leading-5.font-medium.text-gray-700(for="duration") Loan duration
      .mt-1.relative.rounded-md.shadow-sm
        input#duration.form-input.block.w-full.pr-24(type="number" placeholder="0.00" class="sm:text-sm sm:leading-5" v-model="duration")
        .absolute.inset-y-0.right-0.flex.items-center
          select.form-select.h-full.py-0.pl-2.pr-8.border-transparent.bg-transparent.text-gray-500( v-model="durationType" aria-label="As months or years" class="sm:text-sm sm:leading-5")
            option(value="M") Months
            option(value="Y") Years
      p.text-xs.text-gray-500
        template(v-if="this.durationType !== 'M'") Months: {{ months }}
        template(v-else) Years: {{ years }} {{ }}

  .col-span-3
    .flex.flex-col.mt-6
      .border-2
        .grid.grid-flow-col.bg-white.auto-cols-fr(style="grid-template-rows: auto repeat(8, min-content);")
          div.bg-gray-300.flex.items-center.p-3
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500 Balance
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500 Down payment
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500 Payment
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500 Total interest paid
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500
            span(class="hidden md:inline-block") Average
            span(class="md:hidden") Avg
            span.ml-1 monthly interest paid
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500 Total paid for the loan
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500
            span(class="hidden md:inline-block") Number of
            span(class="md:hidden") #
            span.ml-1 monthly payments
          div.border-t.border-r.bg-gray-50.px-3.py-4.cols-auto.text-sm.text-gray-500 Estimated payoff date

          template(v-for="item in items")
            AppColumn(:cents="cents" :principal="principal" :rate="rate" :months="months" :editable="item.editable" :def="item.def")
          AppColumn(:cents="cents" :principal="principal" :rate="rate" :months="months")

      div.mt-2
          label
            input.form-checkbox(type="checkbox" v-model="cents")
            span.ml-2.text-sm.text-gray-500.leading-5 show cents

</template>
<script>
import CurrencyInput from "./CurrencyInput.vue"
import Column from "./Column.vue"
import { currency, round } from "./helpers"
export default {
  components: { AppColumn: Column, CurrencyInput },

  data() {
    return {
      options: { numeral: true, numeralThousandsGroupStyle: "thousand" },
      items: [
        {
          editable: false,
          def: { down: 0, label: "Default" }
        }
      ],
      principal: 200000.3,
      down: 0,
      rate: 6,
      max: 300,
      duration: 15,
      durationType: "Y",
      mode: "duration",
      cents: false
    }
  },
  computed: {
    months() {
      return this.durationType === "M" ? this.duration : this.duration * 12
    },
    years() {
      return this.durationType !== "M" ? this.duration : Math.ceil(this.duration / 12)
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
    durationDetails(months) {
      if (months === 0 || months === null || months === undefined) return { hasValue: false, label: null, value: 0 }

      const _years = Math.floor(months / 12)
      const _months = Math.ceil(months % 12)

      const plural = (cnt, term, display = true) => `${display ? `${cnt} ` : ""}${cnt === 1 ? term : term + "s"}`
      const durationModel = (value, term) => {
        const hv = value > 0
        return {
          hasValue: hv,
          label: hv ? plural(value, term, false) : null,
          value
        }
      }

      const dy = durationModel(_years, "year")
      const dm = durationModel(_months, "month")

      return { year: dy, month: dm, text: "" }
    },
    round
    //https://www.thecalculator.co/finance/Loan-Interest-Calculator-527.html
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
