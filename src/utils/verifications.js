export const filterHealthyImages = fieldId => item => {
  return item.fields?.[fieldId]?.fields?.file?.url
}
