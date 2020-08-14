import React from "react"
import styled from "styled-components"

const PendingContainer = styled.div`
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  text-align: center;
`

const Pending = ({ subject, emoji, height }) => {
  return (
    <PendingContainer height={height || "80vh"}>
      <p style={{ fontSize: "3em" }}>{emoji}</p>
      {subject} coming soon...
    </PendingContainer>
  )
}

export default Pending
