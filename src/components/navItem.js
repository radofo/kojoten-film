import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavigationItem = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: ${props => {
    return props.navcolor
  }};
  &:not(:last-child) {
    margin-right: 20px;
  }
`

const NavItem = ({ children, link }) => {
  const [navColor, setNavColor] = useState("var(--text-color)")
  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1]
    const itemPath = link.split("/")[1]
    if (
      currentPath === itemPath ||
      (itemPath === "" && currentPath === "film")
    ) {
      setNavColor("var(--active-route)")
    }
  }, [])
  return (
    <NavigationItem
      state={{ modal: false }}
      exact="true"
      to={`${link}`}
      navcolor={navColor}
    >
      {children}
    </NavigationItem>
  )
}

export default NavItem
