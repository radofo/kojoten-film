export const sliderSpeedFactor = 140

export const getNodeListWidth = (nodeList) => {
  let totalLength = 0
  nodeList.forEach((node) => {
    totalLength += node.offsetWidth
  })
  return totalLength
}

export function duplicateSlides<T>(slides: T[], dupes: number): T[] {
  let dupedSlides: T[] = []
  for (let i = 0; i < dupes; i++) {
    dupedSlides = dupedSlides.concat(
      slides.map((slide) => ({
        ...slide,
        key: `${i}_${JSON.stringify(slide)}`,
      }))
    )
  }
  return dupedSlides
}
