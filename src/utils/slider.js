export const sliderSpeedFactor = 140

export const getNodeListWidth = nodeList => {
  let totalLength = 0
  nodeList.forEach(node => {
    totalLength += node.offsetWidth
  })
  return totalLength
}
