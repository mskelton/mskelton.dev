const remix = require("@remix-run/express")
const express = require("express")
const yaml = require("js-yaml")
const fs = require("fs")
const path = require("path")
const { getRedirectMiddleware } = require("./middleware/redirects")
const { setupRewrites } = require("./middleware/rewrites")

const app = express()
const filePath = path.join(__dirname, "./config/redirects.yaml")
const { redirects, rewrites } = yaml.load(fs.readFileSync(filePath, "utf8"))

app.use(express.static(path.join(__dirname, "../public")))
app.use(getRedirectMiddleware(redirects))
setupRewrites(app, rewrites)
app.all("*", remix.createRequestHandler({ build: require("./build") }))

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000")
})
