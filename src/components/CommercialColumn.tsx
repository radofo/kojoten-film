import React from "react"
import styled from "styled-components"
import CommercialOverviewProject from "./CommercialOverviewProject"
import { TCommercial } from "../contentful/commercial"
import { CommercialOverviewType } from "../types/general"

const Container = styled.div<{ overviewType: CommercialOverviewType }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ overviewType }) =>
    overviewType === "left" ? "flex-end" : "flex-start"};
  overflow: hidden;
`

const leftWidths = [65, 98, 90, 60, 70, 98]
const rightWidths = [98, 98, 90, 70, 98, 80]

type CommercialColumnProps = {
  commercials: TCommercial[]
  overviewType: CommercialOverviewType
}

const CommercialColumn = ({
  commercials,
  overviewType,
}: CommercialColumnProps) => {
  return (
    <Container overviewType={overviewType}>
      {commercials &&
        commercials.map((commercial, index) => {
          return (
            <CommercialOverviewProject
              key={index}
              overviewType={overviewType}
              commercial={commercial}
              commercialWidth={
                overviewType === "left"
                  ? leftWidths[index % leftWidths.length]
                  : overviewType === "center"
                  ? 100
                  : rightWidths[index % rightWidths.length]
              }
            />
          )
        })}
    </Container>
  )
}

export default CommercialColumn
