import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"

const ErrorPage = styled.div`
  padding: ${(props) => props.theme.spacing.headerHeight}
    ${({ theme }) => theme.spacing.pageSides};
  height: 100vh;
  display: grid;
  place-items: center;
`

const FourOhFour = () => {
  return (
    <Layout>
      <ErrorPage />
    </Layout>
  )
}

export default FourOhFour
