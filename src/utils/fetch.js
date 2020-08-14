import * as contentful from "contentful"

let contentfulConnection = "cdn.contentful.com"
let contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

if (window) {
  const previewHosts = [
    "192.168.178.20:8000",
    "localhost:8000",
    "kojoten-film-integration.web.app",
  ]
  const currentHost = window.location.host
  if (previewHosts.includes(currentHost)) {
    contentfulConnection = "preview.contentful.com"
    contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN_PREVIEW
  }
}

const client = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: contentfulAccessToken,
  host: contentfulConnection,
})

export const defaultLocale = "en-US"

export const getAllEntries = params => {
  return client.getEntries(params)
}

export const getEntry = (id, params) => {
  return client.getEntry(id, params)
}

export const createSrcSet = (src, fileFormat = "png") => {
  const params = fileFormat === "svg" ? "" : "?fm=jpg&fl=progressive"
  return [
    `${src}${params}`,
    `${src}${params} 1x, ${src}${params} 1.5x, ${src}${params} 2x`,
  ]
}
