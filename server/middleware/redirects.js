exports.getRedirectMiddleware = (redirects) => {
  return function redirectMiddleware(req, res, next) {
    const redirect = redirects[req.url]

    if (redirect) {
      res.redirect(307, redirect)
      return
    }

    next()
  }
}
