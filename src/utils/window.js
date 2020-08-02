export const headerHeight = "70"
export const minImageHeight = headerHeight * 3

export const getBatch = images => {
  // eslint-disable-next-line no-restricted-globals
  const screenHeight = window.screen.height
  // eslint-disable-next-line no-restricted-globals
  const screenWidth = window.screen.width

  const worstCaseScreenWidth = Math.max(screenHeight, screenWidth)
  const worstCaseContentAreaHeight = minImageHeight

  // Calculate the estimated width of one images array in the worst case
  const worstCaseImagesWidth = images.reduce((total, currentValue) => {
    const imageAspectRatio =
      currentValue.fields.poster.fields.file.details.image.height /
      currentValue.fields.poster.fields.file.details.image.width
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
      currentValue.fields.poster.fields.file.details.image.height /
      currentValue.fields.poster.fields.file.details.image.width
    const estimatedImageWidth =
      (window.innerHeight - headerHeight) / imageAspectRatio
    return total + estimatedImageWidth
  }, 0)

  return [batch, batchWidth]
}
