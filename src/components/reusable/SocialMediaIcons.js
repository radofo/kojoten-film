import React from "react"
import styled from "styled-components"
import { FaVimeoV, FaFacebookF, FaInstagram } from "react-icons/fa"
import { useSocialMediaContext } from "../context/SocialMedia"

const Icons = styled.div`
  display: flex;
  justify-content: center;
  & > *:not(:last-child) {
    margin-right: 50px;
  }
  margin-bottom: 10px;
`

const SocialLink = styled.a`
  display: inline-block;
  & > * {
    color: ${props => props.theme.colors.textDimmed};
    &:hover {
      color: ${props => props.theme.colors.highlight};
      cursor: pointer;
    }
  }
`

const SocialMediaIcons = () => {
  const iconSize = "18"
  const socialMediaLinks = useSocialMediaContext()
  return (
    <Icons>
      <SocialLink href={socialMediaLinks?.vimeoLink} target="_blank">
        <FaVimeoV size={iconSize} />
      </SocialLink>
      <SocialLink href={socialMediaLinks?.facebookLink} target="_blank">
        <FaFacebookF size={iconSize} />
      </SocialLink>
      <SocialLink href={socialMediaLinks?.instagramLink} target="_blank">
        <FaInstagram size={iconSize} />
      </SocialLink>
    </Icons>
  )
}

export default SocialMediaIcons
