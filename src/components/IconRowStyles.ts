import styled from "styled-components"

export const Icon = styled.img<{ iconWidth?: string; iconHeight?: string }>`
  width: ${({ iconWidth }) => iconWidth ?? "90px"};
  height: ${({ iconHeight }) => iconHeight ?? "40px"};
`
export const IconContainer = styled.div<{ alignment?: string }>`
  gap: 30px;
  display: flex;
  justify-content: ${({ alignment }) => alignment ?? "center"};
  align-items: center;
  flex-wrap: wrap;
`
