<template lang="pug">
a.float-right.relative.text-green-600(href="http://github.com/mgambill/loan-calculator" target="_blank" class="hover:text-green-700")
  svg.w-16.h-16(aria-hidden="true" viewBox="0 0 200 200")
    polygon(fill="currentColor" points="0,0 200,0 200,200")
  .absolute.top-0.right-0.p-2: svg.w-6.h-6.text-white(aria-hidden="true" viewBox="0 0 496 512")
    path(
      fill="currentColor"
      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
    )

section(class="md:container md:mx-auto")
  .p-4: h1.text-3xl.font-bold.text-green-600 Loan Calculation

  .p-4
    .bg-white.rounded-md.shadow-md.p-4.space-y-4(class="md:space-x-4 md:space-y-0 md:grid md:grid-cols-3 dark:bg-gray-800")
      div
        label.block.text-sm.font-medium.leading-5.text-gray-700(for="principal" class="dark:text-gray-300") Loan amount/balance
        .mt-1.relative.rounded-md.shadow-sm
          //-.absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none: span.text-gray-500(class="sm:text-sm sm:leading-5") $
          CurrencyInput.shadow-sm.block.w-full.border-gray-300.rounded-md(class="focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="principal" placeholder="3500")
      div
        label.block.text-sm.font-medium.leading-5.text-gray-700(for="rate" class="dark:text-gray-300") Annual interest rate
        .mt-1.flex.rounded-md.shadow-sm
          input#rate.flex-1.min-w-0.block.w-full.px-3.py-2.rounded-none.rounded-l-md.border-gray-300(type="text" v-model.number="rate" placeholder="5 %" class="focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm")
          span.inline-flex.items-center.px-3.rounded-r-md.border.border-l-0.border-gray-300.bg-gray-50.text-gray-500(class="sm:text-sm") %

      div
        label.block.text-sm.font-medium.text-gray-700(for="duration" class="dark:text-gray-300") Loan duration
        .mt-1.relative.rounded-md.shadow-sm
          input#duration.flex-1.min-w-0.block.w-full.px-3.pl-2.pr-24.rounded-md.border-gray-300(type="number" placeholder="0.00" class="focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="duration")
          .absolute.inset-y-0.right-0.flex.items-center
            select.form-select.h-full.py-0.pl-2.pr-7.border-transparent.bg-transparent.rounded-md.text-gray-500(v-model="durationType" aria-label="As months or years" class="sm:text-sm sm:leading-5")
              option(value="M") Months
              option(value="Y") Years
        p.text-xs.text-gray-500.mt-1(class="dark:text-gray-400")
          template(v-if="durationType !== 'M'") Months: {{ months }}
          template(v-else) Years: {{ years }} {{  }}

    .col-span-3
      .flex.flex-col.mt-6
        div
          .grid.gap-px.p-1.grid-flow-col.bg-gray-300.auto-cols-fr.bg-gray-50.text-sm.text-gray-500(class="dark:bg-gray-500" style="grid-template-rows: auto repeat(8, min-content)")
            .bg-gray-300.flex.items-center.p-3(class="dark:bg-gray-700")
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800") Balance
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800") Down payment
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800") Payment
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800") Total interest paid
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800")
              span.hidden(class="md:inline-block") Average
              span(class="md:hidden") Avg
              span.ml-1 monthly interest paid
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800") Total paid for the loan
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800")
              span.hidden(class="md:inline-block") Number of
              span(class="md:hidden") #
              span.ml-1 monthly payments
            .px-3.py-4.cols-auto.bg-gray-50(class="dark:bg-gray-800") Estimated payoff date

            template(v-for="item in items")
              AppColumn(:cents="cents" :principal="principal" :rate="rate" :months="months" :editable="item.editable" :def="item.def")
            AppColumn(:cents="cents" :principal="principal" :rate="rate" :months="months")

        .mt-2
          label
            input.h-4.w-4.text-indigo-600.border-gray-300.rounded(type="checkbox" v-model="cents" class="focus:ring-indigo-500")
            span.ml-2.text-sm.text-gray-500.leading-5 show cents
</template>
<script>
import CurrencyInput from "./CurrencyInput.vue";
import Column from "./Column.vue";
import { currency, round } from "./helpers";
import { reactive, watch, toRefs, computed } from "vue";
export default {
  components: { AppColumn: Column, CurrencyInput },
  setup() {
    const state = reactive({
      options: { numeral: true, numeralThousandsGroupStyle: "thousand" },
      items: [
        {
          editable: false,
          def: { down: 0, label: "Default" },
        },
      ],
      principal: 200000.3,
      down: 0,
      rate: 6,
      max: 300,
      duration: 15,
      durationType: "Y",
      mode: "duration",
      cents: false,
    });

    const months = computed(() => (state.durationType === "M" ? state.duration : state.duration * 12));
    const years = computed(() => (state.durationType !== "M" ? state.duration : Math.ceil(state.duration / 12)));

    watch(() => state.durationType, (t) => {
      const d = state.duration;
      const m = months.value;
      if (t === "M") state.duration = months.value * 12;
      else state.duration = state.duration / 12;
    });

    const durationDetails = (months) => {
      if (months === 0 || months === null || months === undefined) return { hasValue: false, label: null, value: 0 };

      const _years = Math.floor(months / 12);
      const _months = Math.ceil(months % 12);

      const plural = (cnt, term, display = true) => `${display ? `${cnt} ` : ""}${cnt === 1 ? term : term + "s"}`;
      const durationModel = (value, term) => {
        const hv = value > 0;
        return {
          hasValue: hv,
          label: hv ? plural(value, term, false) : null,
          value,
        };
      };

      const dy = durationModel(_years, "year");
      const dm = durationModel(_months, "month");

      return { year: dy, month: dm, text: "" };
    };

    return {
      ...toRefs(state),
      round,
      durationDetails,
      months,
      years,
    };
    //https://www.thecalculator.co/finance/Loan-Interest-Calculator-527.html
  },
};
</script>

<style>
#app {
  @apply min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden;
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
