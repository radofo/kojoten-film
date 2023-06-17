import styled from "styled-components"

export const SliderNavigation = styled.button<{
  left?: boolean
  right?: boolean
}>`
  color: #c1c1c1;
  outline: none;
  opacity: 0.4;
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
