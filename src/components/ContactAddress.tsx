import React, { useContext } from "react"
import { Firmensitz } from "../contentful/about-us"
import {
  ContactAddressContainer,
  ContactAddressHeader,
  ContactAddressLine,
  ContactAddressLineLink,
} from "./ContactAddressesStyles"
import { LocaleContext } from "../context/LocaleContext"

type ContactAddressProps = {
  firmensitz: Firmensitz
}

const ContactAddress = ({ firmensitz }: ContactAddressProps) => {
  const { locale } = useContext(LocaleContext)

  return (
    <ContactAddressContainer>
      <ContactAddressHeader>{firmensitz.stadt}</ContactAddressHeader>
      <ContactAddressLine>
        {firmensitz.straeUndHausnummer?.[locale]}
      </ContactAddressLine>
      <ContactAddressLine>
        {firmensitz.plz} {firmensitz.stadt}
      </ContactAddressLine>
      <ContactAddressLine>{firmensitz.land?.[locale]}</ContactAddressLine>
      <ContactAddressLine>{firmensitz.telefon}</ContactAddressLine>
      <ContactAddressLineLink href={`mailto:${firmensitz.email}`}>
        {firmensitz.email}
      </ContactAddressLineLink>
    </ContactAddressContainer>
  )
}
export default ContactAddress
