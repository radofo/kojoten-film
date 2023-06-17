export const screenSizes = {
  tablet: "600",
  desktop: "900",
  desktopL: "1440",
}

export const standardTheme = {
  spacing: {
    headerHeight: "70px",
    pageSides: "3%",
  },
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
    background: "#000",
    transparent: "rgba(0, 0, 0, 0)",
    highlight: "#E3BA85",
    textDimmed: "#ababab",
  },
  screenSizes: {
    tablet: `(min-width: ${screenSizes.tablet}px)`,
    desktop: `(min-width: ${screenSizes.desktop}px)`,
    desktopL: `(min-width: ${screenSizes.desktopL}px)`,
  },
}

export type StandardTheme = typeof standardTheme
