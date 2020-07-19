import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { screenSizes } from "../utils/mediaqueries"

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
  const data = useStaticQuery(graphql`
    query {
      allContentfulAdresse {
        edges {
          node {
            straeUndHausnummer
            firmenname
            plzUndStadt
            email
            mapsUrl {
              mapsUrl
            }
          }
        }
      }
    }
  `)
  const adressNode = data.allContentfulAdresse.edges[0].node

  return (
    <ContactAdressContainer>
      <ContactAdressText>
        <ContactAdressTextLine>{adressNode.firmenname}</ContactAdressTextLine>
        <ContactAdressTextLine>
          {adressNode.straeUndHausnummer}
        </ContactAdressTextLine>
        <ContactAdressTextLine>{adressNode.plzUndStadt}</ContactAdressTextLine>
        <ContactAdressTextLine>{adressNode.email}</ContactAdressTextLine>
      </ContactAdressText>
      <MapContainer
        src={adressNode.mapsUrl.mapsUrl}
        frameBorder="0"
        allowFullScreen=""
        tabIndex="0"
      ></MapContainer>
    </ContactAdressContainer>
  )
}

export default ContactAdress
