import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavigationItem = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  &:not(:last-child) {
    margin-right: 20px;
  }
  &.active {
    color: var(--active-route);
  }
`

const NavItem = ({ children, link }) => {
  return (
    <NavigationItem
      state={{ modal: false }}
      exact="true"
      to={`${link}`}
      activeClassName="active"
    >
      {children}
    </NavigationItem>
  )
}

export default NavItem
