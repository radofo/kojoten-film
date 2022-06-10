import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavigationItem = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: ${(props) => {
    return props.isActive
      ? props.theme.colors.highlight
      : props.theme.colors.normal
  }};
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 20px;
  }
`

const NavItem = ({ children, link, locale }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1]
    const itemPath = link.split("/")[1]
    if (
      currentPath === itemPath ||
      (itemPath === "" && currentPath === "film")
    ) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [])

  return (
    <NavigationItem
      state={{ modal: false, locale: locale }}
      exact="true"
      to={`${link}`}
      isActive={isActive}
    >
      {children}
    </NavigationItem>
  )
}

export default NavItem
