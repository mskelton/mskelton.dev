/** @type {import("next").Redirect[]} */
export const redirects = [
  {
    destination: "/blog/my-experience-changing-my-github-username",
    permanent: true,
    source: "/username",
  },
  {
    destination: "/blog/the-dangers-of-shallow-rendering",
    permanent: true,
    source: "/shallow",
  },
  {
    destination: "/blog/automated-npm-publishing-using-github-actions",
    permanent: true,
    source: "/npm-publishing",
  },
  {
    destination: "/blog/using-yarn-constraints",
    permanent: true,
    source: "/constraints",
  },
  {
    destination: "/blog/conquering-derived-state",
    permanent: true,
    source: "/derived-state",
  },
  {
    destination: "/blog/auto-formatting-code-using-prettier-and-github-actions",
    permanent: true,
    source: "/prettier",
  },
  {
    destination: "/blog/automating-npm-package-releases",
    permanent: true,
    source: "/semantic-release",
  },
  {
    destination: "/blog/my-journey-to-become-a-staff-software-engineer",
    permanent: true,
    source: "/staff-engineer",
  },
  {
    destination: "/blog/stop-using-semicolons",
    permanent: true,
    source: "/semicolons",
  },
]

/** @type {import("next").Rewrite[]} */
export const rewrites = [
  {
    destination: "/mark-skelton.pdf",
    source: "/resume.pdf",
  },
  {
    destination:
      "https://raw.githubusercontent.com/mskelton/ratchet/main/transform.ts",
    source: "/ratchet.ts",
  },
  {
    destination: "https://ratchet-mskelton.vercel.app/:asset*",
    source: "/ratchet/:asset*",
  },
  {
    destination:
      "https://raw.githubusercontent.com/mskelton/yarn-plugin-outdated/:version*/bundles/@yarnpkg/plugin-outdated.js",
    source: "/yarn-outdated/:version*",
  },
  {
    destination: "https://mskelton.github.io/termicons/:asset*",
    source: "/termicons/:asset*",
  },
  {
    destination:
      "https://raw.githubusercontent.com/mskelton/:repo/main/scripts/install.sh",
    source: "/:repo/install",
  },
  {
    destination:
      "https://raw.githubusercontent.com/mskelton/dprint-config/:version/dprint.json",
    source: "/dprint/:version.json",
  },
]
