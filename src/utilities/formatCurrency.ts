const CURRENCY_FORMATTERS = new Intl.NumberFormat("en-US",{
    currency:"USD",
    style: "currency"
})

export function formatCurrency(number: number){
    return CURRENCY_FORMATTERS.format(number);
}