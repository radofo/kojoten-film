exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/film/)) {
    page.matchPath = "/film/*"
    createPage(page)
  } else if (page.path.match(/^\/media/)) {
    page.matchPath = "/media/*"
    createPage(page)
  }
}
