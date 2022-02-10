const fs = require("fs")
const path = require("path")

exports.getRedirectMiddleware = () => {
  const source = fs.readFileSync(path.join(__dirname, "../_redirects"), "utf8")

  const redirects = source
    .split("\n")
    .map((line, lineNumber) => {
      if (!line.trim() || line.startsWith("#")) return null

      const [from, to] = line
        .split(" ")
        .map((part) => part.trim())
        .filter(Boolean)

      if (!from || !to) {
        console.error(`Invalid redirect on line ${lineNumber + 1}: "${line}"`)
        return null
      }

      const toURL = to.startsWith("/")
        ? new URL(to, "https://mskelton.dev")
        : new URL(to)

      return { from, toURL }
    })
    .filter(Boolean)

  console.log(redirects)

  return function redirectsMiddleware(req, res, next) {
    const host = req.header("X-Forwarded-Host") ?? req.header("host")
    const protocol = host?.includes("localhost") ? "http" : "https"
    let reqUrl

    try {
      reqUrl = new URL(`${protocol}://${host}${req.url}`)
    } catch (error) {
      console.error(`Invalid URL: ${protocol}://${host}${req.url}`)
      next()
      return
    }

    for (const redirect of redirects) {
      const match = req.path === redirect.from
      if (!match) continue

      const toUrl = redirect.toUrl
      toUrl.protocol = protocol
      if (toUrl.host === "same_host") toUrl.host = reqUrl.host

      for (const [key, value] of reqUrl.searchParams.entries()) {
        toUrl.searchParams.append(key, value)
      }
      toUrl.pathname = redirect.toPathname(params)
      res.redirect(307, toUrl.toString())
      return
    }

    next()
  }
}
