export type TeamMember = {
  name: string
  profileImage?: string
  position?: number
  occupation: {
    de: string
    en: string
  }
  phone?: string
  email?: string
  instaLink?: string
  key: string
}

export function fromContentfulResponseToTeamMembers(
  response: any
): TeamMember[] {
  return response.items.map((item) => {
    return parseContentfulTeamMember(item.fields)
  })
}

export function parseContentfulTeamMember(
  itemFields: any
): TeamMember | undefined {
  if (!itemFields) return

  return {
    name: itemFields.name?.de ?? "",
    occupation: {
      en: itemFields.berufsbezeichnung?.en ?? itemFields.berufsbezeichnung?.de,
      de: itemFields.berufsbezeichnung?.de,
    },
    email: itemFields.email?.de,
    phone: itemFields.telefonnummer?.de,
    instaLink: itemFields.instagramProfilLink?.de,
    profileImage: itemFields.profilbild?.de?.fields?.file?.de?.url ?? "",
    position: itemFields.position?.de,
    key: `${JSON.stringify(itemFields)}`,
  }
}
