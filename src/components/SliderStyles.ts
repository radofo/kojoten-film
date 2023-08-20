import styled, { css } from "styled-components"

export const SliderContainer = styled.div<{ sliderHeight?: string }>`
  width: 100%;
  height: ${({ sliderHeight }) => sliderHeight ?? "initial"};
  display: flex;
  justify-content: center;
  position: relative;
`

export const SwiperArea = styled.div<{ isHeightDefinedByContainer?: boolean }>`
  overflow: hidden;
  border-radius: 5px;
  width: 100%;
  position: relative;

  ${({ isHeightDefinedByContainer }) => {
    if (isHeightDefinedByContainer) {
      return `
        height: 100%;
        & .swiper-slide,
        & .swiper {
          height: 100%;
        }
      `
    }
  }};
`

export const NavContainer = styled.div<{
  left: boolean
  overlapDesktop?: boolean
  overlapMobile?: boolean
}>`
  display: grid;
  place-items: center;
  ${({ overlapDesktop, overlapMobile, left }) => {
    const overlapStyles = css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${left ? "10px" : "initial"};
      right: ${left ? "initial" : "10px"};
    `
    const nonOverlapStyles = css`
      position: relative;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
    `

    return css`
      ${overlapMobile ? overlapStyles : nonOverlapStyles}
      @media ${({ theme }) => theme.screenSizes.tablet} {
        ${overlapDesktop ? overlapStyles : nonOverlapStyles}
      }
    `
  }};
`

export const SliderNavigation = styled.button<{
  left?: boolean
  right?: boolean
}>`
  color: #c1c1c1;
  outline: none;
  opacity: 0.7;
  font-size: 2em;
  background: rgba(0, 0, 0, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  @media ${({ theme }) => theme.screenSizes.desktop} {
    font-size: 2.5em;
  }
  z-index: 8888;
`
