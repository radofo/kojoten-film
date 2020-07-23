import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"

import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
import { defaultLocale } from "../utils/fetch"

const ContactAdressContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${screenSizes.tablet} {
    flex-direction: row;
    width: 100%;
  }
`

const ContactAdressText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 25px;
  @media ${screenSizes.tablet} {
    align-items: flex-start;
    margin-right: 50px;
  }
`

const ContactAdressTextLine = styled.p`
  color: white;
`

const MapContainer = styled.iframe`
  border: 0;
  width: 100%;
  height: 300px;
  @media ${screenSizes.tablet} {
    height: 450px;
    max-width: 600px;
  }
`

const ContactAdress = () => {
  const [address, setAddress] = useState({})
  const [locale, setLocale] = useState(defaultLocale)

  useEffect(() => {
    fetchContentful
      .getAllEntries({ content_type: "adresse", locale: locale })
      .then(data => {
        setAddress(data.items[0].fields)
      })
  }, [locale])

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <ContactAdressContainer>
      <ContactAdressText>
        <ContactAdressTextLine>{address.firmenname}</ContactAdressTextLine>
        <ContactAdressTextLine>
          {address.straeUndHausnummer}
        </ContactAdressTextLine>
        <ContactAdressTextLine>{address.plzUndStadt}</ContactAdressTextLine>
        <ContactAdressTextLine>{address.email}</ContactAdressTextLine>
        <button onClick={() => changeLocale("de")}>DE</button>
        <button onClick={() => changeLocale("en-US")}>EN</button>
      </ContactAdressText>
      <MapContainer
        src={address.mapsUrl}
        frameBorder="0"
        allowFullScreen=""
        tabIndex="0"
      ></MapContainer>
    </ContactAdressContainer>
  )
}

export default ContactAdress
