import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"

const ErrorPage = styled.div`
  padding: ${(props) => props.theme.spacing.headerHeight}
    ${({ theme }) => theme.spacing.pageSides};
  color: white;
  height: 100vh;
  display: grid;
  place-items: center;
`

const ErrorContainer = styled.div``

const ErrorHeader = styled.h1`
  margin-bottom: 30px;
`

const ErrorMessage = styled.p``

const FourOhFour = () => {
  return (
    <Layout>
      <ErrorPage>
        <ErrorContainer>
          <ErrorHeader>Page not found</ErrorHeader>
          <ErrorMessage>
            Ooops...the page you are looking for has been removed or relocated.
          </ErrorMessage>
        </ErrorContainer>
      </ErrorPage>
    </Layout>
  )
}

export default FourOhFour
