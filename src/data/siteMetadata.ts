const siteMetadata = {
  analytics: {
    // true or false
    googleAnalyticsId: "", // supports plausible, simpleAnalytics or googleAnalytics
    plausibleDataDomain: "", // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // e.g. UA-000000-2 or G-XXXXXXX
  },
  author: "Tails Azimuth",
  comment: {
    disqusConfig: {
      // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
      shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    }, // supported providers: giscus, utterances, disqus
    giscusConfig: {
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      // theme when dark mode
      darkTheme: "transparent_dark",
      mapping: "pathname",
      // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: "0",
      // supported options: pathname, url, title
      reactions: "1",
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: "light",
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: "",
    }, // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: "giscus", utterancesConfig: {
      // theme when dark mode
      darkTheme: "",
      issueTerm: "",
      // supported options: pathname, url, title
      label: "",
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://utteranc.es/
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      // label (optional): Comment 💬
      // theme example: github-light, github-dark, preferred-color-scheme
      // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
      theme: "",
    },
  },
  description: "A blog created with Next.js and Tailwind.css",
  email: "address@yoursite.com",
  facebook: "https://facebook.com",
  github: "https://github.com",
  headerTitle: "TailwindBlog",
  image: "/static/images/avatar.png",
  language: "en-us",
  linkedin: "https://www.linkedin.com",
  locale: "en-US",
  newsletter: {
    // supports mailchimp, buttondown, convertkit
    // Please add your .env file and modify it according to your selection
    provider: "buttondown",
  },
  siteLogo: "/static/images/logo.png",
  siteRepo: "https://github.com/timlrx/tailwind-nextjs-starter-blog",
  siteUrl: "https://tailwind-nextjs-starter-blog.vercel.app",
  socialBanner: "/static/images/twitter-card.png",
  title: "Next.js Starter Blog",
  twitter: "https://twitter.com/Twitter",
  youtube: "https://youtube.com",
}

module.exports = siteMetadata
