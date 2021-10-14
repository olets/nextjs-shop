export const numberToUSDString = (number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return formatter.format(number)
}

export const numberToUSDNumber = (USD) => {
  const USDString = numberToUSDString(USD)
  const USDNumber = USDString.replace(/^\$/, '').replace(',', '')
  return USDNumber
}