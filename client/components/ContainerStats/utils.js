export const hexColorGenerator = (length) => {
  const hexColors = []

  let i = 0
  while (i++ <= length) {
    let generatedHex = Math.floor(Math.random() * 0xfffff * 1000000).toString(16)
    hexColors.push('#' + generatedHex.slice(0, 6))
  }

  return hexColors
}