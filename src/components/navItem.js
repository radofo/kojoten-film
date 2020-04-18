import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledLink = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
`

const NavItemContainer = styled.li`
  &:not(:last-child) {
    margin-right: 20px;
  }
`

const NavItem = ({ children, link }) => {
  return (
    <NavItemContainer>
      <StyledLink to={`/${link}`}>{children}</StyledLink>
    </NavItemContainer>
  )
}

export default NavItem
