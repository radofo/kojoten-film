import React from "react"
import styled from "styled-components"
import MediaContainer from "../mediaContainer"

const commercialMarginV = 5
const commercialMarginH = 7

const Container = styled.div`
  position: relative;
  min-height: 50px; // hack to ensure that the text from the commecial overviews is not visible on the initial viewport
  width: ${({ commercialWidth }) => `${commercialWidth}%`};
  margin: ${({ side, isDesktop }) =>
    isDesktop
      ? side === "left"
        ? `${commercialMarginV}px ${commercialMarginH}px ${commercialMarginV}px 0px`
        : `${commercialMarginV}px 0px ${commercialMarginV}px ${commercialMarginH}px`
      : "0"};
  &:first-child {
    margin: ${({ side, isDesktop }) =>
      isDesktop
        ? side === "left"
          ? `${
              commercialMarginH * 2
            }px ${commercialMarginH}px ${commercialMarginV}px 0px`
          : `${
              commercialMarginH * 2
            }px 0px ${commercialMarginV}px ${commercialMarginH}px`
        : "0"};
  }
`
const CommercialInfos = styled.div`
  position: absolute;
  left: ${({ isDesktop, side }) =>
    isDesktop ? (side === "left" ? "initial" : "0") : "50%"};
  right: ${({ isDesktop, side }) =>
    isDesktop && side === "left" ? "0" : "initial"};
  top: 50%;
  transform: ${({ isDesktop }) =>
    isDesktop ? "translate(0, -50%)" : "translate(-50%, -50%)"};
  width: ${({ isDesktop }) => (isDesktop ? "initial" : "100%")};
  z-index: 10;
  color: white;
`

const KundeUndName = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ isDesktop, side }) =>
    isDesktop ? (side === "left" ? "flex-end" : "flex-start") : "center"};
  @media ${({ theme }) => theme.screenSizes.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
`
const Kunde = styled.p`
  text-transform: uppercase;
  text-align: center;
  padding: 0 10px;
`
const Name = styled.p`
  padding: 0 10px;
  text-align: center;
`

const Regisseur = styled.p`
  padding: 0 10px;
  font-weight: 300;
  text-align: ${({ isDesktop, side }) =>
    isDesktop ? (side === "left" ? "right" : "left") : "center"};
`

const CommercialOverviewProject = ({
  commercial,
  commercialWidth,
  side,
  isDesktop,
}) => {
  const { fields: infos } = commercial

  return (
    <Container
      commercialWidth={isDesktop ? commercialWidth : 100}
      isDesktop={isDesktop}
      side={side}
    >
      <MediaContainer
        media={{
          image: { src: infos.poster.fields.file.url },
        }}
        playbackLink={infos.url ? `/media/c/${infos.url}` : undefined}
        overlayOnHover={true}
        mobilePlayOptOut={true}
      >
        <CommercialInfos isDesktop={isDesktop} side={side}>
          <KundeUndName isDesktop={isDesktop} side={side}>
            <Kunde>{infos.kunde}</Kunde>
            <Name>{infos.name}</Name>
          </KundeUndName>
          <Regisseur isDesktop={isDesktop} side={side}>
            {infos.regisseur}
          </Regisseur>
        </CommercialInfos>
      </MediaContainer>
    </Container>
  )
}

export default CommercialOverviewProject
