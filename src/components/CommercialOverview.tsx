import React, { useState, useLayoutEffect, useEffect } from "react"
import CommercialColumn from "./CommercialColumn"
import CommercialOverviewProject from "./CommercialOverviewProject"
import {
  Container,
  ContainerDesktop,
  ContainerMobile,
} from "./CommercialOverviewStyles"
import { TCommercial } from "../contentful/commercial"
import { screenSizes } from "../styles/theme"

type CommercialOverviewProps = {
  overviewCommercials: TCommercial[]
  activeIndex: number
  overviewRef: React.RefObject<HTMLDivElement>
}

const CommercialOverview = ({
  overviewCommercials,
  activeIndex,
  overviewRef,
}: CommercialOverviewProps) => {
  const [isDesktop, setIsDesktop] = useState(false)

  const allButCurrentCommercial = overviewCommercials.filter(
    (_, index) => index !== activeIndex
  )
  const leftCommercials = allButCurrentCommercial.filter(
    (_, index) => index % 2 === 0
  )
  const rightCommercials = allButCurrentCommercial.filter(
    (_, index) => index % 2 !== 0
  )

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleResize = () => {
    setIsDesktop(window.innerWidth > parseInt(screenSizes.desktop))
  }

  return (
    <Container oneColumn={!isDesktop} ref={overviewRef}>
      {isDesktop ? (
        <ContainerDesktop>
          <CommercialColumn commercials={leftCommercials} overviewType="left" />
          <CommercialColumn
            commercials={rightCommercials}
            overviewType="right"
          />
        </ContainerDesktop>
      ) : (
        <ContainerMobile>
          {allButCurrentCommercial.map((commercial, index) => {
            return (
              <CommercialOverviewProject
                key={index}
                commercial={commercial}
                commercialWidth={100}
                overviewType="center"
              />
            )
          })}
        </ContainerMobile>
      )}
    </Container>
  )
}

export default CommercialOverview
