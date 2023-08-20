import styled, { css } from "styled-components"

export const Container = styled.div<{
  oneColumn: boolean
}>`
  color: ${({ theme }) => theme.colors.normal};
  position: relative;
  ${({ oneColumn }) => {
    if (!oneColumn) {
      return css`
        padding-inline: 3px;
      `
    }
  }};
  z-index: 9;
`

export const ContainerDesktop = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50% 50%;
`

export const ContainerMobile = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`
