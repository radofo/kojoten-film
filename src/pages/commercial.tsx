import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import * as fetchContentful from "../utils/fetch"

import {
  TCommercial,
  fromContentfulReponseToCommercials,
} from "../contentful/commercial"
import { VideoControllerContextProvider } from "../context/VideoControllerContext"
import CommercialContent from "../components/CommercialContent"

const Commercial = () => {
  const [commercials, setCommercials] = useState<TCommercial[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetchContentful.getAllEntriesWithAllLocales(
        "commercial",
        {
          order: "fields.position",
        }
      )
      const mappedResponse = fromContentfulReponseToCommercials(response)
      const validatedResponse = mappedResponse.filter(Boolean)
      setCommercials(validatedResponse)
    })()
  }, [])

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>Kojoten | Commercial</title>
        <meta name="description" content="Kojoten Film" />
      </Helmet>
      <VideoControllerContextProvider>
        <CommercialContent commercials={commercials} />
      </VideoControllerContextProvider>
    </Layout>
  )
}

export default Commercial
