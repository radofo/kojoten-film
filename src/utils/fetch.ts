import * as contentful from "contentful"

let contentfulConnection = "cdn.contentful.com"
let contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

export const defaultLocale = "de"

const previewHosts = [
  "localhost:8000",
  "kojoten-film-integration.web.app",
  "kojoten-film-vorschau.netlify.app",
]

export async function getAllEntriesWithAllLocales(
  contentType: string,
  where?: { [key: string]: string | number }
): Promise<any> {
  return await getAllEntries(
    { content_type: contentType, ...(where ?? {}) },
    window.location.host,
    true
  )
}

export const getAllEntries = (params, hostname, withAllLocales = false) => {
  if (previewHosts.includes(hostname)) {
    contentfulConnection = "preview.contentful.com"
    contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN_PREVIEW
  }
  const client = contentful.createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID as string,
    accessToken: contentfulAccessToken as string,
    host: contentfulConnection,
  })
  if (withAllLocales) {
    return client.withAllLocales.getEntries(params)
  } else {
    return client.getEntries(params)
  }
}

export const getEntry = (id, params, hostname) => {
  if (previewHosts.includes(hostname)) {
    contentfulConnection = "preview.contentful.com"
    contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN_PREVIEW
  }
  const client = contentful.createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID as string,
    accessToken: contentfulAccessToken as string,
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
  let params = ""
  if (fileFormat !== "svg") {
    if (!isTransparent) {
      params = params + `?fm=jpg&fl=progressive`
    }
    if (size) {
      const leadingSign = params.indexOf("?") > -1 ? "&" : "?"
      params = params + `${leadingSign}w=${size}`
    }
  }

  return [
    `${src}${params}`,
    `${src}${params} 1x, ${src}${params} 1.5x, ${src}${params} 2x`,
  ]
}
