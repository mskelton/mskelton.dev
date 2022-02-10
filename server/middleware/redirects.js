const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")

exports.getRedirectMiddleware = () => {
  const filePath = path.join(__dirname, "../config/redirects.yaml")
  const redirects = yaml.load(fs.readFileSync(filePath, "utf8"))

  return function redirectMiddleware(req, res, next) {
    const redirect = redirects[req.url]

    if (redirect) {
      res.redirect(307, redirect)
      return
    }

    next()
  }
}
