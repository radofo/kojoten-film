import styled from "styled-components"

export const NavButton = styled.button`
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
  z-index: 9999;
  position: absolute;
  left: ${props => {
    return props.left ? 0 : "initial"
  }};
  right: ${props => {
    return props.right ? 0 : "initial"
  }};
  top: 50%;
  transform: translateY(-50%);
  padding: var(--padding-sides);
`

export const ScrollButton = styled.button`
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
  z-index: 9999;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
`
