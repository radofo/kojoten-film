import React from "react"
import { createSrcSet } from "../utils/fetch"
import styled from "styled-components"

const Icon = styled.img`
  width: ${({ iconWidth }) => iconWidth ?? "90px"};
  height: ${({ iconHeight }) => iconHeight ?? "40px"};
`
const IconContainer = styled.div`
  gap: 30px;
  display: flex;
  justify-content: ${({ alignment }) => alignment ?? "center"};
  align-items: center;
  flex-wrap: wrap;
`

export const IconRow = ({ icons, iconWidth, iconHeight, alignment }) => {
  return (
    <IconContainer alignment={alignment}>
      {icons &&
        icons.map((icon, index) => {
          const [awardSrc, awardSrcSet] = createSrcSet({
            src: icon.fields.file.url,
            size: "200",
            fileFormat:
              icon.fields.file.contentType.indexOf("svg") > -1
                ? "svg"
                : undefined,
            isTransparent: true,
          })
          const aspectRatio =
            icon.fields.file.details.image.width /
            icon.fields.file.details.image.height

          const isWide = aspectRatio > 2
          const iconWidthStyle = isWide ? "auto" : iconWidth ?? "90px"
          const iconHeightStyle = isWide ? iconHeight ?? "40px" : "auto"

          return (
            <Icon
              key={index}
              src={awardSrc}
              srcSet={awardSrcSet}
              iconWidth={iconWidthStyle}
              iconHeight={iconHeightStyle}
            />
          )
        })}
    </IconContainer>
  )
}
