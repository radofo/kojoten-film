import React from "react"
import { createSrcSet } from "../utils/fetch"
import { Icon, IconContainer } from "./IconRowStyles"
import { Image } from "../contentful/types"

type IconRowProps = {
  icons: Image[]
  iconWidth?: string
  iconHeight?: string
  alignment?: string
}

export const IconRow = ({
  icons,
  iconWidth,
  iconHeight,
  alignment,
}: IconRowProps) => {
  return (
    <IconContainer alignment={alignment}>
      {icons &&
        icons.map((icon, index) => {
          const [awardSrc, awardSrcSet] = createSrcSet({
            src: icon.url,
            size: "200",
            fileFormat:
              icon.contentType?.indexOf("svg") > -1 ? "svg" : undefined,
            isTransparent: true,
          })
          const aspectRatio = icon.width / icon.height

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
