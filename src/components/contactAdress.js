import React, { useEffect, useState } from "react"
import * as fetchContentful from "../utils/fetch"

import styled from "styled-components"
import Pending from "./pending"

const ContactAdressContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    flex-direction: row;
    width: 100%;
  }
`

const ContactAdressText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 25px;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    align-items: flex-start;
    margin-right: 50px;
  }
`

const ContactAdressTextLine = styled.p`
  color: white;
  margin-bottom: 5px;
`

const MailLink = styled.a`
  color: white;
  &:hover {
    color: var(--highlight-color);
  }
`

const MapContainer = styled.iframe`
  border: 0;
  width: 100%;
  height: 300px;
  filter: grayscale(100%) invert(1) brightness(0.9);
  border-radius: 5px;
  @media ${({ theme }) => theme.screenSizes.desktop} {
    height: 450px;
    max-width: 600px;
  }
`

const ContactAdress = ({ locale }) => {
  // Data
  const [address, setAddress] = useState({})
  // Misc
  const [isComingSoon, setIsComingSoon] = useState(false)

  useEffect(() => {
    fetchContentful
      .getAllEntries(
        { content_type: "adresse", locale: locale },
        window.location.host
      )
      .then(data => {
        if (data.items.length > 0) {
          setAddress(data.items[0].fields)
        } else {
          setIsComingSoon(true)
        }
      })
  }, [locale])

  return (
    <ContactAdressContainer>
      {isComingSoon ? (
        <Pending emoji="" subject="Address Information is" height="initial" />
      ) : (
        <React.Fragment>
          <ContactAdressText>
            <ContactAdressTextLine>{address.firmenname}</ContactAdressTextLine>
            <ContactAdressTextLine>
              {address.straeUndHausnummer}
            </ContactAdressTextLine>
            <ContactAdressTextLine>{address.plzUndStadt}</ContactAdressTextLine>
            <ContactAdressTextLine>
              <MailLink href={`mailto:${address.email}`}>
                {address.email}
              </MailLink>
            </ContactAdressTextLine>
            <ContactAdressTextLine>{address.telefon}</ContactAdressTextLine>
          </ContactAdressText>
          <MapContainer
            src={address.mapsUrl}
            frameBorder="0"
            allowFullScreen=""
            tabIndex="0"
          ></MapContainer>
        </React.Fragment>
      )}
    </ContactAdressContainer>
  )
}

export default ContactAdress
