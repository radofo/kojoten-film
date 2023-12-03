import { CommercialWithWidth, TCommercial } from "../contentful/commercial"

/** extend the baseCommercialWidths array to a given length (concat) */
function getFullWidths(arrLength: number) {
  const baseCommercialWidths = [75, 80, 98, 89, 98]
  return Array.from({ length: arrLength }, (_, index) => index).map(
    (index: number) => {
      return baseCommercialWidths[index % baseCommercialWidths.length]
    }
  )
}

/**
 *
 * @param leftCommercials commercial infos. might be one more that rightCommercials
 * @param rightCommercials commercial infos. equal or one less than leftCommercials
 * @returns commercials for the left and right columns and their widths (right widths is the reverse of the left widths)
 * if left commercials is more more: subtract the (last left commercial width / number of left commercials) from every left commercial, incl last left commercial
 */
function augmentCommercials(
  leftCommercials: TCommercial[],
  rightCommercials: TCommercial[]
): [CommercialWithWidth[], CommercialWithWidth[]] {
  let leftWidths: number[] = []
  let rightWidths: number[] = []
  const defaultLeftWidths = getFullWidths(leftCommercials.length)

  if (leftCommercials.length === rightCommercials.length) {
    leftWidths = defaultLeftWidths
    rightWidths = [...leftWidths].reverse()
  } else {
    const lastLeftElement = defaultLeftWidths[defaultLeftWidths.length - 1]
    const reduction = lastLeftElement / defaultLeftWidths.length
    leftWidths = defaultLeftWidths.map((width) => width - reduction)
    rightWidths = [...defaultLeftWidths].slice(0, -1).reverse()
  }
  const leftCommercialsWithWidth: CommercialWithWidth[] = leftCommercials.map(
    (commercial, index) => {
      return {
        commercial,
        width: leftWidths[index],
      }
    }
  )
  const rightCommercialsWithWidth: CommercialWithWidth[] = rightCommercials.map(
    (commercial, index) => {
      return {
        commercial,
        width: rightWidths[index],
      }
    }
  )
  return [leftCommercialsWithWidth, rightCommercialsWithWidth]
}

export { augmentCommercials }
