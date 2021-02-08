import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavigationItem = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: ${(props) => {
    return props.navcolor
  }};
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 20px;
  }
`

const NavItem = ({ children, link, locale }) => {
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
      state={{ modal: false, locale: locale }}
      exact="true"
      to={`${link}`}
      navcolor={navColor}
    >
      {children}
    </NavigationItem>
  )
}

export default NavItem
