import styled from "styled-components"

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
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
export const NavContainer = styled.div<{ left: boolean }>`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ left }) => (left ? "10px" : "initial")};
  right: ${({ left }) => (left ? "initial" : "10px")};

  @media ${({ theme }) => theme.screenSizes.tablet} {
    position: relative;
    left: initial;
    right: initial;
    top: initial;
    bottom: initial;
  }
`

export const SwiperArea = styled.div`
  overflow: hidden;
  border-radius: 5px;
  position: relative;
`
