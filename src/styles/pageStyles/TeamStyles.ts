import styled from "styled-components"

export const TeamContainer = styled.div`
  padding-top: ${(props) => props.theme.spacing.headerHeight};
  display: flex;
  align-items: center;
  height: 100dvh;
  height: 100vh;
  overflow-y: hidden;
  color: ${({ theme }) => theme.colors.normal};

  & .swiper-slide {
    width: fit-content !important;
  }
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
  width: 95dvw;
  height: calc(95dvw * 14 / 9);
  max-height: 70dvh;
  object-fit: cover;
  border-radius: 5px;
  background: black;
  outline: 1px solid black;

  @media ${({ theme }) => theme.screenSizes.tablet} {
    height: 550px;
    width: calc(550px * 9 / 14);
  }
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
