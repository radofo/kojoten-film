import React, { useState, useEffect, useContext } from "react"
import * as fetchContentful from "../../utils/fetch"

const SocialMediaContext = React.createContext({})

export const SocialMediaContextProvider = ({ children }) => {
  const [socialMedia, setSocialMedia] = useState({})
  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "socialMedia" }, window.location.host)
      .then(data => {
        if (data.items.length > 0) {
          setSocialMedia(data.items[0].fields)
        }
      })
  }, [])
  return (
    <SocialMediaContext.Provider value={socialMedia}>
      {children}
    </SocialMediaContext.Provider>
  )
}

export const useSocialMediaContext = () => {
  const socialMediaContext = useContext(SocialMediaContext)
  return socialMediaContext
}
