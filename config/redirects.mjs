/** @type {import("next").Redirect[]} */
export const redirects = [
  {
    destination: "https://termicons.mskelton.dev",
    source: "/termicons",
    permanent: true,
  },
  {
    destination: "https://ratchet.mskelton.dev",
    source: "/ratchet",
    permanent: true,
  },
]

/** @type {import("next").Rewrite[]} */
export const rewrites = [
  {
    destination: "/mark-skelton.pdf",
    source: "/resume.pdf",
  },
]
