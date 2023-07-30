import React, { ReactNode, useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import { getAllEntries, createSrcSet } from "../utils/fetch"
import {
  TeamMember,
  fromContentfulResponseToTeamMembers,
} from "../contentful/team"
import {
  MemberCredit,
  MemberImage,
  MemberInfo,
  MemberName,
  MemberSlide,
  MemberSocialMedia,
  SocialLink,
  TeamContainer,
} from "../styles/pageStyles/TeamStyles"
import Slider from "../components/Slider"
import { FaEnvelope, FaInstagram, FaPhone } from "react-icons/fa"
import { LocaleContext } from "../context/LocaleContext"

const Team = () => {
  const { locale } = useContext(LocaleContext)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    ;(async () => {
      const apidata = await getAllEntries(
        { content_type: "teamMember" },
        window.location.host,
        true
      )
      const newTeamMembers = fromContentfulResponseToTeamMembers(apidata)
      const sortedTeamMembers = [...newTeamMembers].sort(
        (a: TeamMember, b: TeamMember) =>
          (a?.position ?? 999999999) - (b?.position ?? 999999999)
      )
      setTeamMembers(sortedTeamMembers)
    })()
  }, [])

  function contentToJsx(teamMember: TeamMember): ReactNode {
    const iconSize = "18"
    const [src, srcSet] = createSrcSet({
      src: teamMember.profileImage,
      size: "900",
    })

    return (
      <MemberSlide>
        <MemberImage src={src} srcSet={srcSet} />
        <MemberInfo>
          <MemberName>{teamMember.name}</MemberName>
          <MemberCredit>{teamMember.occupation?.[locale]}</MemberCredit>
          <MemberSocialMedia>
            {teamMember?.phone && (
              <SocialLink href={`tel:${teamMember.phone}`} target="_blank">
                <FaPhone size={iconSize} />
              </SocialLink>
            )}
            {teamMember?.email && (
              <SocialLink href={`mailto:${teamMember.email}`} target="_blank">
                <FaEnvelope size={iconSize} />
              </SocialLink>
            )}
            {teamMember.instaLink && (
              <SocialLink href={teamMember.instaLink} target="_blank">
                <FaInstagram size={iconSize} />
              </SocialLink>
            )}
          </MemberSocialMedia>
        </MemberInfo>
      </MemberSlide>
    )
  }

  return (
    <Layout transparentHeader>
      <Helmet>
        <title>Kojoten | Team</title>
        <meta
          name="description"
          content="Inhabende Produzentinnen Stefanie Gödicke, Magdalena Wolff"
        />
      </Helmet>
      <TeamContainer>
        <Slider slidesData={teamMembers} contentToJsx={contentToJsx} />
      </TeamContainer>
    </Layout>
  )
}

export default Team
