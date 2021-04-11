import React from "react"
import styled from "styled-components"

const ContactAddressesContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContactAddressesFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 100px;
  padding: 50px 0 0;
`

const ContactAddressContainer = styled.div`
  display: flex;
  flex-basis: 33%;
  min-width: 350px;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
`

const ContactAddressHeader = styled.h1`
  color: ${props => props.theme.colors.highlight};
  font-weight: 300;
  text-transform: uppercase;
`

const ContactAddressLine = styled.p`
  color: ${props => props.theme.colors.textDimmed};
  font-size: ${props => props.theme.fontSizes.smallText};
  margin-bottom: 10px;
`

const ContactAddressLineLink = styled.a`
  color: ${props => props.theme.colors.textDimmed};
  font-size: ${props => props.theme.fontSizes.smallText};
  margin-bottom: 10px;
  text-decoration: underline;
  &:hover {
    color: ${props => props.theme.colors.highlight};
  }
`

const ContactAddress = ({ address }) => {
  return (
    <ContactAddressContainer>
      <ContactAddressHeader>{address.stadt}</ContactAddressHeader>
      <ContactAddressLine>{address.straeUndHausnummer}</ContactAddressLine>
      <ContactAddressLine>
        {address.plz} {address.stadt}
      </ContactAddressLine>
      <ContactAddressLine>{address.land}</ContactAddressLine>
      <ContactAddressLine>{address.telefon}</ContactAddressLine>
      <ContactAddressLineLink href={`mailto:${address.email}`}>
        {address.email}
      </ContactAddressLineLink>
    </ContactAddressContainer>
  )
}

const ContactAddresses = ({ addresses }) => {
  return (
    <ContactAddressesContainer>
      <ContactAddressesFlex>
        {addresses &&
          addresses.map((address, index) => (
            <ContactAddress key={index} address={address.fields} />
          ))}
      </ContactAddressesFlex>
    </ContactAddressesContainer>
  )
}

export default ContactAddresses
