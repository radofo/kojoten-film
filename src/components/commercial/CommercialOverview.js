import React, { useState, useLayoutEffect, useEffect } from "react"
import styled from "styled-components"
import CommercialColumn from "./CommercialColumn"
import CommercialOverviewProject from "./CommercialOverviewProject"

const Container = styled.div`
  color: ${({ theme }) => theme.colors.normal};
  position: relative;
  z-index: 9;
`

const ContainerDesktop = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50% 50%;
`

const ContainerMobile = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`

const CommercialOverview = ({
  overviewCommercials,
  isDesktop,
  overviewRef,
}) => {
  const [leftCommercials, setLeftCommercials] = useState([])
  const [rightCommercials, setRightCommercials] = useState([])

  useLayoutEffect(() => {
    const left = []
    const right = []
    overviewCommercials.forEach((commercial, index) => {
      index % 2 === 0 ? left.push(commercial) : right.push(commercial)
    })
    setLeftCommercials(left)
    setRightCommercials(right)
  }, [overviewCommercials])

  return (
    <Container ref={overviewRef}>
      {isDesktop ? (
        <ContainerDesktop>
          <CommercialColumn
            commercials={leftCommercials}
            side="left"
            isDesktop={isDesktop}
          />
          <CommercialColumn
            commercials={rightCommercials}
            side="right"
            isDesktop={isDesktop}
          />
        </ContainerDesktop>
      ) : (
        <ContainerMobile>
          {overviewCommercials.map((commercial, index) => {
            return (
              <CommercialOverviewProject
                key={index}
                commercial={commercial}
                isDesktop={isDesktop}
              />
            )
          })}
        </ContainerMobile>
      )}
    </Container>
  )
}

export default CommercialOverview
