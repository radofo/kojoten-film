import React from "react"
import Header from "../components/header"
import { Link } from "gatsby"

class Commercial extends React.Component {
  render() {
    return (
      <div>
        <Header transparent={false} />
        <Link to="/">Home</Link>
        <img src="https://source.unsplash.com/random/400x200" alt="" />
      </div>
    )
  }
}

export default Commercial
