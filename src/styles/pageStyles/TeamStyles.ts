import styled from "styled-components"

export const TeamContainer = styled.div`
  padding-top: ${(props) => props.theme.spacing.headerHeight};
  display: flex;
  align-items: center;
  height: 100dvh;
  height: 100vh;
  overflow-y: hidden;
  color: ${({ theme }) => theme.colors.normal};
`
export const SliderContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
`

export const NavContainer = styled.div`
  display: grid;
  place-items: center;
`

export const SwiperArea = styled.div`
  overflow: hidden;
  border-radius: 5px;
  position: relative;
`

export const MemberSlide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${({ theme }) => theme.screenSizes.tablet} {
    gap: 30px;
  }
`

export const MemberImage = styled.img`
  width: 80dvw;
  height: calc(80dvw * 14 / 9);
  max-height: 70dvh;

  @media ${({ theme }) => theme.screenSizes.tablet} {
    height: 550px;
    width: calc(550px * 9 / 14);
  }

  object-fit: cover;
  border-radius: 5px;
  background: black;
  outline: 1px solid black;
`

export const MemberInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${({ theme }) => theme.screenSizes.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`

export const MemberName = styled.p`
  font-weight: bold;
  text-transform: uppercase;
`

export const MemberCredit = styled.p`
  font-weight: 300;
`

export const MemberSocialMedia = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 8px;
`

export const SocialLink = styled.a`
  display: inline-block;
  & > * {
    color: ${(props) => props.theme.colors.textDimmed};
    &:hover {
      color: ${(props) => props.theme.colors.highlight};
      cursor: pointer;
    }
  }
`
