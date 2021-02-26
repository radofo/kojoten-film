import React from "react"
import { createSrcSet } from "../utils/fetch"
import styled from "styled-components"

const IconRowIconStyle = styled.img`
  width: ${props => (props.isWide ? "auto" : "90px")};
  height: ${props => (props.isWide ? "50px" : "auto")};
  margin: 0 20px 20px 0;
`
const IconRowStyle = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`
const IconRowHeadingStyle = styled.h4`
  font-weight: bold;
`

const IconRowContainer = styled.div`
  margin-top: 40px;
`

export const IconRow = ({ icons, heading }) => {
  return (
    <IconRowContainer>
      <IconRowHeadingStyle>{heading}</IconRowHeadingStyle>
      <IconRowStyle>
        {icons &&
          icons.map((icon, index) => {
            const [awardSrc, awardSrcSet] = createSrcSet(
              icon.fields.file.url,
              icon.fields.file.contentType.indexOf("svg") > -1
                ? "svg"
                : undefined,
              true
            )
            const aspectRatio =
              icon.fields.file.details.image.width /
              icon.fields.file.details.image.height

            return (
              <IconRowIconStyle
                isWide={aspectRatio > 2}
                key={index}
                src={awardSrc}
                srcSet={awardSrcSet}
              />
            )
          })}
      </IconRowStyle>
    </IconRowContainer>
  )
}
