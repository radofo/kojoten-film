const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const filmDetailTemplate = path.resolve("./src/templates/filmDetail.js")
  const res = await graphql(`
    query {
      allContentfulFilm {
        edges {
          node {
            url
          }
        }
      }
    }
  `)

  res.data.allContentfulFilm.edges.forEach(edge => {
    createPage({
      component: filmDetailTemplate,
      path: `/${edge.node.url}`,
      context: {
        slug: edge.node.url,
      },
    })
  })
}
