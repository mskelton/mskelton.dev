const remix = require("@remix-run/express")
const express = require("express")
const path = require("path")
const { getRedirectMiddleware } = require("./middleware/redirects")

const app = express()

app.use(express.static(path.join(__dirname, "../public")))
app.use(getRedirectMiddleware())
app.all("*", remix.createRequestHandler({ build: require("./build") }))

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000")
})
