import * as contentful from "contentful"
const client = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN_PREVIEW,
  host: "preview.contentful.com",
})

export const defaultLocale = "en-US"

export const getAllEntries = params => {
  return client.getEntries(params)
}

export const getEntry = (id, params) => {
  return client.getEntry(id, params)
}

export const createSrcSet = src => {
  return [`${src}?q=50`, `${src}?q=50 1x, ${src}?q=50 1.5x, ${src}?q=50 2x`]
}