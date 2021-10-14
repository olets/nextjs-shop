export const numberToUSD = (number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return formatter.format(number)
}

export const USDtoNumber = (USD) => {
  return USD.replace(/^\$/, '').replace(',', '')
}