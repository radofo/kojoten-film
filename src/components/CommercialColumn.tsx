import React from "react"
import styled from "styled-components"
import CommercialOverviewProject from "./CommercialOverviewProject"
import { CommercialWithWidth } from "../contentful/commercial"
import { CommercialOverviewType } from "../types/general"

const Container = styled.div<{ overviewType: CommercialOverviewType }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ overviewType }) =>
    overviewType === "left" ? "flex-end" : "flex-start"};
  overflow: hidden;
`

type CommercialColumnProps = {
  commercialsWithWidth: CommercialWithWidth[]
  overviewType: CommercialOverviewType
}

const CommercialColumn = ({
  commercialsWithWidth,
  overviewType,
}: CommercialColumnProps) => {
  return (
    <Container overviewType={overviewType}>
      {commercialsWithWidth &&
        commercialsWithWidth.map((cww, index) => {
          return (
            <CommercialOverviewProject
              key={index}
              overviewType={overviewType}
              commercial={cww.commercial}
              commercialWidth={cww.width}
            />
          )
        })}
    </Container>
  )
}

export default CommercialColumn
