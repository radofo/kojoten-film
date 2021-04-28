export const screenSizes = {
  tablet: "600",
  desktop: "900",
  desktopL: "1440",
}

export const standardTheme = {
  fontSizes: {
    xSmall: "16px",
    small: "18px",
    regular: "20px",
    large: "22px",
    xLarge: "24px",
    xxLarge: "26px",
    xxxLarge: "28px",
    xxxxLarge: "30px",
  },
  colors: {
    normal: "#fff",
    highlight: "#E3BA85",
    textDimmed: "#ababab",
  },
  screenSizes: {
    tablet: `(min-width: ${screenSizes.tablet}px)`,
    desktop: `(min-width: ${screenSizes.desktop}px)`,
    desktopL: `(min-width: ${screenSizes.desktopL}px)`,
  },
}
