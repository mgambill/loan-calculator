const clean = v => +`${v}`.replace(/[^0-9.]/g, "")

const currency = (value, prefix = "$ ", cents = 2) => {
  // var x = `${prefix}${(+value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
  // return cents == 0 ? x.split(".")[0] : x

  if (value === null) return null

  return new Intl.NumberFormat("EN-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents,
    maximumFractionDigits: cents
    //currencyDisplay: 'symbol',
  }).format(clean(value))
}
const round = (value, decimals = 3) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals)
}

function nper(principle, rate, payment) {
  const r = rate / 1200
  return Math.log(((payment * -1) / r - 0) / (principle + (payment * -1) / r)) / Math.log(1 + r)
}

function pmt(principle, rate, months) {
  let interest = rate / 1200

  let top = Math.pow(1 + interest, months)
  let bottom = top - 1
  let ratio = top / bottom

  return principle * interest * ratio
}

export { clean, currency, round, pmt, nper }
