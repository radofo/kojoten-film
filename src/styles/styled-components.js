import { ArrowLeft } from "react-feather"
import React from "react"
import styled from "styled-components"

export const BackButton = styled((props) => <ArrowLeft {...props} />)`
  color: ${({ theme }) => theme.colors.normal};
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`
