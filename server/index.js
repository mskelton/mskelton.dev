const express = require("express")
const remix = require("@remix-run/express")

const app = express()

app.all("*", remix.createRequestHandler({ build: require("./build") }))

app.listen(8080)
