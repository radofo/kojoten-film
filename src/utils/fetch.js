import * as contentful from "contentful"

let contentfulConnection = "cdn.contentful.com"
let contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

export const defaultLocale = "de"

const previewHosts = [
  "localhost:8000",
  "kojoten-film-integration.web.app",
  "kojoten-film-vorschau.netlify.app",
]

export const getAllEntries = (params, hostname) => {
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

export const createSrcSet = ({
  src,
  size,
  fileFormat = "png",
  isTransparent = false,
}) => {
  const imageW = size ? `&w=${size}` : undefined
  const params =
    fileFormat === "svg" || isTransparent
      ? ""
      : `?fm=jpg&fl=progressive${imageW ?? ""}`
  return [
    `${src}${params}`,
    `${src}${params} 1x, ${src}${params} 1.5x, ${src}${params} 2x`,
  ]
}
