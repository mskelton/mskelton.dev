/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/*.mjs",
    "next.config.mjs",
  ],
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
  theme: {
    extend: {
      animation: {
        "draw-stroke": "300ms ease-in-out 700ms forwards draw-stroke",
      },
      aria: {
        current: 'current="page"',
      },
      keyframes: {
        "draw-stroke": {
          to: { strokeDashoffset: 0 },
        },
      },
    },
    fontSize: {
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
    },
    typography: (theme) => {
      const base = {
        "> *": {
          marginBottom: theme("spacing.10"),
          marginTop: theme("spacing.10"),
        },
        color: "var(--tw-prose-body)",
        lineHeight: theme("lineHeight.7"),
        p: {
          marginBottom: theme("spacing.7"),
          marginTop: theme("spacing.7"),
        },
      }

      const headers = {
        ":is(h2, h3) + *": {
          marginTop: 0,
        },
        h2: {
          fontSize: theme("fontSize.xl")[0],
          lineHeight: theme("lineHeight.7"),
          marginBottom: theme("spacing.4"),
          marginTop: theme("spacing.16"),
          paddingTop: theme("spacing.4"),
        },
        // Headings
        "h2, h3": {
          color: "var(--tw-prose-headings)",
          fontWeight: theme("fontWeight.semibold"),
        },
        h3: {
          fontSize: theme("fontSize.base")[0],
          lineHeight: theme("lineHeight.7"),
          marginBottom: theme("spacing.4"),
          marginTop: theme("spacing.12"),
          paddingTop: theme("spacing.4"),
        },
      }

      const images = {
        img: {
          borderRadius: theme("borderRadius.3xl"),
        },
      }

      const links = {
        ":is(a:hover, a:focus):not(.heading-link)": {
          backgroundPosition: `0 100%`,
          backgroundSize: `100% 100%`,
          borderRadius: theme("borderRadius.sm"),
          marginInline: "-" + theme("spacing[0.5]"),
          paddingInline: theme("spacing[0.5]"),
        },
        "a:not(.heading-link)": {
          backgroundImage: `linear-gradient(var(--tw-prose-link-bg), var(--tw-prose-link-bg))`,
          backgroundPosition: `bottom 2px left 100%`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `100% 3px`,
          color: "var(--tw-prose-link)",
          fontWeight: theme("fontWeight.semibold"),
          transitionDuration: theme("transitionDuration.150"),
          transitionProperty: "all",
          transitionTimingFunction: theme("transitionTimingFunction.in-out"),
        },
        "a:not(.heading-link):focus": {
          outline: "none",
        },
        "em a:not(.heading-link):hover": {
          marginRight: "-" + theme("spacing.1"),
          paddingRight: theme("spacing.1"),
        },
      }

      const misc = {
        ":is(h2, h3) code": {
          fontWeight: theme("fontWeight.bold"),
        },

        "a code": {
          color: "inherit",
        },
        blockquote: {
          borderLeftColor: "var(--tw-prose-quote-borders)",
          borderLeftWidth: theme("borderWidth.2"),
          fontStyle: "italic",
          paddingLeft: theme("spacing.6"),
        },
        code: {
          backgroundColor: "var(--tw-prose-code-bg)",
          borderRadius: theme("borderRadius.lg"),
          color: "var(--tw-prose-code)",
          display: "inline-block",
          fontWeight: theme("fontWeight.semibold"),
          paddingInline: theme("spacing.2"),
        },
        hr: {
          "@screen lg": {
            marginLeft: `calc(${theme("spacing.12")} * -1)`,
            marginRight: `calc(${theme("spacing.12")} * -1)`,
          },
          borderColor: "var(--tw-prose-hr)",
          borderTopWidth: "1px",
          marginBottom: theme("spacing.20"),
          marginTop: theme("spacing.20"),
        },
        kbd: {
          backgroundColor: "var(--tw-prose-kbd-bg)",
          borderColor: "var(--tw-prose-kbd-borders)",
          borderRadius: theme("borderRadius.md"),
          borderWidth: theme("borderWidth.DEFAULT"),
          boxShadow: "inset 0 -1px 0 var(--tw-prose-kbd-borders)",
          color: "var(--tw-prose-kbd)",
          fontSize: theme("fontSize.xs")[0],
          paddingBlock: theme("spacing.[0.5]"),
          paddingInline: theme("spacing.1"),
        },
        "p code": {
          fontSize: theme("fontSize.xs")[0],
          lineHeight: theme("lineHeight.6"),
        },
        strong: {
          color: "var(--tw-prose-bold)",
          fontWeight: theme("fontWeight.semibold"),
        },
      }

      const lists = {
        li: {
          marginBottom: theme("spacing.4"),
          marginTop: theme("spacing.4"),
          paddingLeft: theme("spacing[3.5]"),
        },
        "li :is(li, p)": {
          marginBottom: theme("spacing.3"),
          marginTop: theme("spacing.3"),
        },
        "li :is(ol, ul)": {
          marginBottom: theme("spacing.4"),
          marginTop: theme("spacing.4"),
        },
        "li::marker": {
          fontSize: theme("fontSize.sm")[0],
          fontWeight: theme("fontWeight.semibold"),
        },
        ol: {
          listStyleType: "decimal",
        },
        "ol > li::marker": {
          color: "var(--tw-prose-counters)",
        },
        ul: {
          listStyleType: "disc",
        },
        "ul > li::marker": {
          color: "var(--tw-prose-bullets)",
        },
        "ul, ol": {
          paddingLeft: theme("spacing.6"),
        },
      }

      const code = {
        ".has-title pre": {
          borderRadius: "0 0 1rem 1rem",
        },
        pre: {
          backgroundColor: "var(--tw-prose-pre-bg) !important",
          border: "1px solid",
          borderColor: "var(--tw-prose-pre-border)",
          borderRadius: theme("borderRadius.2xl"),
          color: "var(--tw-prose-pre-code)",
          fontSize: theme("fontSize.sm")[0],
          fontWeight: theme("fontWeight.medium"),
        },
        "pre code": {
          backgroundColor: "transparent",
          borderRadius: 0,
          color: "inherit",
          display: "block",
          fontSize: "inherit",
          fontWeight: "inherit",
          overflowX: "auto",
          padding: theme("spacing.8"),
        },
      }

      return {
        DEFAULT: {
          css: {
            ...base,
            ...headers,
            ...images,
            ...links,
            ...misc,
            ...lists,
            ...code,
            "--tw-prose-body": theme("colors.zinc.600"),
            "--tw-prose-bold": theme("colors.zinc.900"),
            "--tw-prose-bullets": theme("colors.zinc.900"),
            "--tw-prose-captions": theme("colors.zinc.400"),
            "--tw-prose-code": theme("colors.zinc.700"),
            "--tw-prose-code-bg": theme("colors.zinc.300 / 0.2"),
            "--tw-prose-counters": theme("colors.zinc.900"),
            "--tw-prose-headings": theme("colors.zinc.900"),
            "--tw-prose-hr": theme("colors.zinc.100"),
            "--tw-prose-kbd": theme("colors.zinc.700"),
            "--tw-prose-kbd-bg": theme("colors.zinc.50"),
            "--tw-prose-kbd-borders": theme("colors.zinc.200"),
            "--tw-prose-link": theme("colors.zinc.900"),
            "--tw-prose-link-bg": theme("colors.indigo.300"),
            "--tw-prose-pre-bg": theme("colors.zinc.900"),
            "--tw-prose-pre-border": "transparent",
            "--tw-prose-pre-code": theme("colors.zinc.100"),
            "--tw-prose-quote-borders": theme("colors.zinc.200"),
            "--tw-prose-underline": theme("colors.indigo.500 / 0.2"),
            "--tw-prose-underline-hover": theme("colors.indigo.500"),
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.zinc.400"),
            "--tw-prose-bold": theme("colors.zinc.200"),
            "--tw-prose-bullets": theme("colors.zinc.200"),
            "--tw-prose-captions": theme("colors.zinc.500"),
            "--tw-prose-code": theme("colors.zinc.300"),
            "--tw-prose-code-bg": theme("colors.zinc.200 / 0.05"),
            "--tw-prose-counters": theme("colors.zinc.200"),
            "--tw-prose-headings": theme("colors.zinc.200"),
            "--tw-prose-hr": theme("colors.zinc.700 / 0.4"),
            "--tw-prose-kbd": theme("colors.zinc.300"),
            "--tw-prose-kbd-bg": theme("colors.zinc.800"),
            "--tw-prose-kbd-borders": theme("colors.zinc.700"),
            "--tw-prose-link": theme("colors.zinc.100"),
            "--tw-prose-link-bg": theme("colors.indigo.500"),
            "--tw-prose-pre-bg": "rgb(0 0 0 / 0.4)",
            "--tw-prose-pre-border": theme("colors.zinc.200 / 0.1"),
            "--tw-prose-pre-code": theme("colors.zinc.100"),
            "--tw-prose-quote-borders": theme("colors.zinc.500"),
            "--tw-prose-underline": theme("colors.indigo.400 / 0.3"),
            "--tw-prose-underline-hover": theme("colors.indigo.400"),
          },
        },
      }
    },
  },
}
