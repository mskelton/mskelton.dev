exports.setupRewrites = (app, rewrites) => {
  for (const [from, to] of Object.entries(rewrites)) {
    app.all(from, (req, res) => {
      let url = to

      for (const [key, value] of Object.entries(from)) {
        url = to.replace(":" + key, value || "")
      }

      return res.redirect(307, url)
    })
  }
}
