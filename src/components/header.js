import React from "react"
import headerStyles from "./header.module.css"
import styled from "styled-components"

const Navigation = styled.div`
  border: 1px solid purple;
  color: grey;
  & > * {
    color: pink;
  }
`

const Header = props => {
  return (
    <div className={headerStyles.header}>
      {/* CSS Modules */}
      Will this header be transparent?: {props.transparent ? "Yes" : "No"}
      <Navigation>
        {/* Styled Components */}
        <p>Hi there</p>
      </Navigation>
    </div>
  )
}

export default Header
