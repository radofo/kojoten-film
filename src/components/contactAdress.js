import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"

import styled from "styled-components"
import { screenSizes } from "../utils/mediaqueries"
import { defaultLocale } from "../utils/fetch"
import Pending from "./pending"

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
        if (data.items.length > 0) {
          setAddress(data.items[0].fields)
        } else {
          setAddress({})
        }
      })
  }, [locale])

  const changeLocale = newLocale => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <ContactAdressContainer>
      {Object.keys(address) > 0 ? (
        <React.Fragment>
          <ContactAdressText>
            <ContactAdressTextLine>{address.firmenname}</ContactAdressTextLine>
            <ContactAdressTextLine>
              {address.straeUndHausnummer}
            </ContactAdressTextLine>
            <ContactAdressTextLine>{address.plzUndStadt}</ContactAdressTextLine>
            <ContactAdressTextLine>{address.email}</ContactAdressTextLine>
          </ContactAdressText>
          <MapContainer
            src={address.mapsUrl}
            frameBorder="0"
            allowFullScreen=""
            tabIndex="0"
          ></MapContainer>
        </React.Fragment>
      ) : (
        <Pending emoji="" subject="Address Information is" height="initial" />
      )}
    </ContactAdressContainer>
  )
}

export default ContactAdress
