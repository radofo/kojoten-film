import { useState, useEffect } from "react"
import { createClient } from "contentful"

let contentfulConnection = "cdn.contentful.com"
let contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
const previewHosts = ["localhost:8000", "kojoten-film-integration.web.app"]

export const defaultLocale = "de"

export const useContentfulEntries = ({ params, hostname }) => {
  const [data, setData] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    if (previewHosts.includes(hostname)) {
      contentfulConnection = "preview.contentful.com"
      contentfulAccessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN_PREVIEW
    }
    const client = createClient({
      space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
      accessToken: contentfulAccessToken,
      host: contentfulConnection,
    })
    client.getEntries(params).then(apidata => {
      if (apidata.items.length > 0) {
        setData(apidata.items)
      } else {
        setIsEmpty(true)
      }
    })
  }, [params.locale])

  return [data, isEmpty]
}
