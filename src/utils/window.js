export const headerHeight = "70"
export const minImageHeight = headerHeight * 3

export const debounce = (func, wait, immediate) => {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export const getBatch = images => {
  // eslint-disable-next-line no-restricted-globals
  const screenHeight = screen.height
  // eslint-disable-next-line no-restricted-globals
  const screenWidth = screen.width

  const worstCaseScreenWidth = Math.max(screenHeight, screenWidth)
  const worstCaseContentAreaHeight = minImageHeight

  // Calculate the estimated width of one images array in the worst case
  const worstCaseImagesWidth = images.reduce((total, currentValue) => {
    const imageAspectRatio =
      currentValue.node.poster.fixed.height /
      currentValue.node.poster.fixed.width
    const estimatedImageWidth = worstCaseContentAreaHeight / imageAspectRatio
    return total + estimatedImageWidth
  }, 0)

  // Meaning: The screen (worst case) is imagesToScreenRatio-times wider than one images array
  const imagesToScreenRatio = worstCaseScreenWidth / worstCaseImagesWidth
  // How many times do I need to concat the images array to fill one screen
  const imagesArraysPerBatch = Math.ceil(imagesToScreenRatio)

  let batch = []

  for (let i = 0; i < imagesArraysPerBatch; i++) {
    batch = batch.concat(images)
  }

  // Calculate the Batch width
  const batchWidth = batch.reduce((total, currentValue) => {
    const imageAspectRatio =
      currentValue.node.poster.fixed.height /
      currentValue.node.poster.fixed.width
    const estimatedImageWidth =
      (window.innerHeight - headerHeight) / imageAspectRatio
    return total + estimatedImageWidth
  }, 0)

  return [batch, batchWidth]
}
