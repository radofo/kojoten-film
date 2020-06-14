import React from "react"
import styled from "styled-components"

const PendingContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
`

const Pending = ({ children }) => {
  return (
    <PendingContainer>
      🚧 {children} page currently under development 🚧
    </PendingContainer>
  )
}

export default Pending
