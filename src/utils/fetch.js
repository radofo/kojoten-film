import * as contentful from "contentful"

let contentfulConnection = "cdn.contentful.com"
let contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

export const defaultLocale = "en-US"

export const getAllEntries = (params, hostname) => {
  const previewHosts = [
    // "192.168.178.20:8000",
    "localhost:8000",
    "kojoten-film-integration.web.app",
  ]
  if (previewHosts.includes(hostname)) {
    contentfulConnection = "preview.contentful.com"
    contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN_PREVIEW
  }
  const client = contentful.createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: contentfulAccessToken,
    host: contentfulConnection,
  })
  return client.getEntries(params)
}

export const getEntry = (id, params, hostname) => {
  const previewHosts = [
    // "192.168.178.20:8000",
    "localhost:8000",
    "kojoten-film-integration.web.app",
  ]
  if (previewHosts.includes(hostname)) {
    contentfulConnection = "preview.contentful.com"
    contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN_PREVIEW
  }
  const client = contentful.createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: contentfulAccessToken,
    host: contentfulConnection,
  })
  return client.getEntry(id, params)
}

export const createSrcSet = (src, fileFormat = "png") => {
  const params = fileFormat === "svg" ? "" : "?fm=jpg&fl=progressive"
  return [
    `${src}${params}`,
    `${src}${params} 1x, ${src}${params} 1.5x, ${src}${params} 2x`,
  ]
}
