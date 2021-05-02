import React from "react"
import styled from "styled-components"
import CommercialOverviewProject from "./CommercialOverviewProject"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ side }) => (side === "left" ? "flex-end" : "flex-start")};
  overflow: hidden;
`

const leftWidths = [65, 100, 90, 60, 70, 100]
const rightWidths = [100, 100, 90, 70, 100, 80]

const CommercialColumn = ({ commercials, side, isDesktop }) => {
  return (
    <Container side={side}>
      {commercials &&
        commercials.map((commercial, index) => {
          return (
            <CommercialOverviewProject
              key={index}
              side={side}
              isDesktop={isDesktop}
              commercial={commercial}
              commercialWidth={
                side === "left"
                  ? leftWidths[index % leftWidths.length]
                  : rightWidths[index % rightWidths.length]
              }
            />
          )
        })}
    </Container>
  )
}

export default CommercialColumn
