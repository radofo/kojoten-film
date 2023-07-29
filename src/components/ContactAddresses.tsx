import React from "react"
import { Firmensitz } from "../contentful/about-us"
import ContactAddress from "./ContactAddress"
import { ContactAddressesContainer } from "./ContactAddressesStyles"

type ContactAddressesProps = {
  firmensitze: Firmensitz[]
}

const ContactAddresses = ({ firmensitze }: ContactAddressesProps) => {
  return (
    <ContactAddressesContainer>
      {firmensitze.map((firmensitz) => (
        <ContactAddress
          key={`${firmensitz.stadt}${firmensitz.straeUndHausnummer}`}
          firmensitz={firmensitz}
        />
      ))}
    </ContactAddressesContainer>
  )
}

export default ContactAddresses
