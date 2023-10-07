/* eslint-disable sort/object-properties */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin")

/** @type {import("tailwindcss").Config} */
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
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          s: (value) => ({
            height: value,
            width: value,
          }),
        },
        { values: theme("width") },
      )
    }),
  ],
  theme: {
    extend: {
      aria: {
        current: 'current="page"',
      },
      animation: {
        "draw-stroke": "300ms ease-in-out 700ms forwards draw-stroke",
        heartbeat:
          "1s ease-in-out 0s infinite alternate none running heartbeat",
      },
      keyframes: {
        "draw-stroke": {
          to: { strokeDashoffset: 0 },
        },
        dash: {
          "0%": {
            strokeDashoffset: 1,
            strokeDasharray: "1, 150",
          },
          "50%": {
            strokeDashoffset: -35,
            strokeDasharray: "90, 150",
          },
          "100%": {
            strokeDashoffset: -124,
            strokeDasharray: "90, 150",
          },
        },
        halfspin: {
          to: { transform: "rotate(180deg)" },
        },
        heartbeat: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.1)" },
        },
        show: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
    fontSize: {
      "2xs": ["0.75rem", { lineHeight: "1rem" }],
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    typography: (theme) => {
      const transition = {
        transitionProperty: theme("transitionProperty.colors"),
        transitionDuration: theme("transitionDuration.150"),
        transitionTimingFunction: theme("transitionTimingFunction.in-out"),
      }

      return {
        invert: {
          css: {
            "--tw-prose-body": theme("colors.zinc.400"),
            "--tw-prose-headings": theme("colors.zinc.200"),
            "--tw-prose-link": theme("colors.zinc.100"),
            "--tw-prose-link-bg": theme("colors.indigo.500"),
            "--tw-prose-underline": theme("colors.indigo.400 / 0.3"),
            "--tw-prose-underline-hover": theme("colors.indigo.400"),
            "--tw-prose-bold": theme("colors.zinc.200"),
            "--tw-prose-counters": theme("colors.zinc.200"),
            "--tw-prose-bullets": theme("colors.zinc.200"),
            "--tw-prose-hr": theme("colors.zinc.700 / 0.4"),
            "--tw-prose-quote-borders": theme("colors.zinc.500"),
            "--tw-prose-captions": theme("colors.zinc.500"),
            "--tw-prose-code": theme("colors.zinc.300"),
            "--tw-prose-code-bg": theme("colors.zinc.200 / 0.05"),
            "--tw-prose-code-link": theme("colors.indigo.400"),
            "--tw-prose-code-link-hover": theme("colors.indigo.500"),
            "--tw-prose-kbd": theme("colors.zinc.300"),
            "--tw-prose-kbd-bg": theme("colors.zinc.800"),
            "--tw-prose-kbd-borders": theme("colors.zinc.700"),
            "--tw-prose-hl-bg": theme("colors.slate.800 / 40%"),
            "--tw-prose-hl-border": theme("colors.indigo.500"),
          },
        },
        DEFAULT: {
          css: {
            "--tw-prose-ring": `inset 0 0 0 3px ${theme("colors.indigo.500")}`,
            "--tw-prose-body": theme("colors.zinc.600"),
            "--tw-prose-headings": theme("colors.zinc.900"),
            "--tw-prose-link": theme("colors.zinc.900"),
            "--tw-prose-link-hover": theme("colors.zinc.100"),
            "--tw-prose-link-bg": theme("colors.indigo.400"),
            "--tw-prose-underline": theme("colors.indigo.500 / 0.2"),
            "--tw-prose-underline-hover": theme("colors.indigo.400"),
            "--tw-prose-bold": theme("colors.zinc.900"),
            "--tw-prose-counters": theme("colors.zinc.900"),
            "--tw-prose-bullets": theme("colors.zinc.900"),
            "--tw-prose-hr": theme("colors.zinc.100"),
            "--tw-prose-quote-borders": theme("colors.zinc.200"),
            "--tw-prose-captions": theme("colors.zinc.400"),
            "--tw-prose-code": theme("colors.zinc.700"),
            "--tw-prose-code-bg": theme("colors.zinc.300 / 0.2"),
            "--tw-prose-code-link": theme("colors.indigo.600"),
            "--tw-prose-code-link-hover": theme("colors.indigo.500"),
            "--tw-prose-pre-code": theme("colors.zinc.100"),
            "--tw-prose-pre-bg": theme("colors.zinc.900"),
            "--tw-prose-kbd": theme("colors.zinc.700"),
            "--tw-prose-kbd-bg": theme("colors.zinc.50"),
            "--tw-prose-kbd-borders": theme("colors.zinc.200"),
            "--tw-prose-hl-bg": theme("colors.slate.800 / 60%"),
            "--tw-prose-hl-border": theme("colors.indigo.500"),

            // Base
            color: "var(--tw-prose-body)",
            lineHeight: theme("lineHeight.7"),
            "> *": {
              marginTop: theme("spacing.10"),
              marginBottom: theme("spacing.10"),
            },
            p: {
              ...transition,
              marginTop: theme("spacing.7"),
              marginBottom: theme("spacing.7"),
            },

            // Headings
            "h2, h3": {
              color: "var(--tw-prose-headings)",
              fontWeight: theme("fontWeight.semibold"),
            },
            h2: {
              fontSize: theme("fontSize.xl")[0],
              lineHeight: theme("lineHeight.7"),
              marginTop: theme("spacing.16"),
              paddingTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
            },
            h3: {
              fontSize: theme("fontSize.base")[0],
              lineHeight: theme("lineHeight.7"),
              marginTop: theme("spacing.12"),
              paddingTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
            },
            ":is(h2, h3) + *": {
              marginTop: 0,
            },

            // Images
            img: {
              borderRadius: theme("borderRadius.xl"),
            },

            // Links
            "a:not(.heading-link):not(:has(code))": {
              color: "var(--tw-prose-link)",
              fontWeight: theme("fontWeight.semibold"),
              backgroundImage: `linear-gradient(var(--tw-prose-link-bg), var(--tw-prose-link-bg))`,
              backgroundPosition: "bottom 2px left 100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: `100% 3px`,
              transitionProperty: "all",
              transitionDuration: theme("transitionDuration.150"),
              transitionTimingFunction: theme(
                "transitionTimingFunction.in-out",
              ),
            },
            ":is(a:hover, a:focus):not(.heading-link)": {
              color: "var(--tw-prose-link-hover, var(--tw-prose-link))",
              backgroundPosition: `0 100%`,
              backgroundSize: `100% 100%`,
              borderRadius: theme("borderRadius.sm"),
              paddingInline: theme("spacing[0.5]"),
              marginInline: `-${theme("spacing[0.5]")}`,
            },
            "a:not(.heading-link):focus": {
              outline: "none",
            },
            "em a:not(.heading-link):hover": {
              paddingRight: theme("spacing.1"),
              marginRight: `-${theme("spacing.1")}`,
            },

            strong: {
              color: "var(--tw-prose-bold)",
              fontWeight: theme("fontWeight.semibold"),
            },
            code: {
              ...transition,
              display: "inline-block",
              color: "var(--tw-prose-code)",
              fontWeight: theme("fontWeight.semibold"),
              backgroundColor: "var(--tw-prose-code-bg)",
              borderRadius: theme("borderRadius.lg"),
              paddingInline: theme("spacing.2"),
            },
            ":is(p, li, aside) code": {
              fontSize: theme("fontSize.xs")[0],
              lineHeight: theme("lineHeight.6"),
            },
            "a code": {
              color: "var(--tw-prose-code-link)",
            },
            "a:has(code):hover code": {
              color: "var(--tw-prose-code-link-hover)",
            },
            "a:has(code):focus code": {
              boxShadow: `inset 0 0 0 2px ${theme("colors.indigo.500")}`,
            },
            ":is(h2, h3) code": {
              fontWeight: theme("fontWeight.bold"),
            },
            kbd: {
              ...transition,
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

            // Quotes
            blockquote: {
              paddingLeft: theme("spacing.6"),
              borderLeftWidth: theme("borderWidth.2"),
              borderLeftColor: "var(--tw-prose-quote-borders)",
              fontStyle: "italic",
            },

            // Figures
            figcaption: {
              color: "var(--tw-prose-captions)",
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("lineHeight.6"),
              marginTop: theme("spacing.3"),
            },
            "figcaption > p": {
              margin: 0,
            },

            // Lists
            ul: {
              listStyleType: "disc",
            },
            ol: {
              listStyleType: "decimal",
            },
            "ul, ol": {
              paddingLeft: theme("spacing.6"),
            },
            li: {
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
              paddingLeft: theme("spacing[3.5]"),
            },
            "li::marker": {
              fontSize: theme("fontSize.sm")[0],
              fontWeight: theme("fontWeight.semibold"),
            },
            "ol > li::marker": {
              color: "var(--tw-prose-counters)",
            },
            "ul > li::marker": {
              color: "var(--tw-prose-bullets)",
            },
            "li :is(ol, ul)": {
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
            },
            "li :is(li, p)": {
              marginTop: theme("spacing.3"),
              marginBottom: theme("spacing.3"),
            },

            // Code blocks
            ".code-block": {
              position: "relative",
            },
            ".code-block.has-title": {
              paddingTop: theme("spacing.12"),
            },
            ".code-block:not(.demo)": {
              marginInline: 0,
              "@screen sm": {
                marginInline: `calc(${theme("spacing.8")} * -1)`,
              },
            },
            pre: {
              marginInline: `calc(${theme("spacing.4")} * -1)`,
              backgroundColor: theme("colors.zinc.950"),
              fontSize: theme("fontSize.sm")[0],
              "@screen sm": {
                marginInline: theme("margin.0"),
              },
            },
            "pre code": {
              backgroundColor: "transparent",
              borderRadius: 0,
              color: theme("colors.zinc.100"),
              display: "grid",
              fontSize: "inherit",
              fontWeight: "inherit",
              overflowX: "auto",
              paddingBlock: theme("spacing.8"),
              paddingInline: theme("spacing.4"),
              "@screen sm": {
                padding: theme("spacing.8"),
              },
            },
            "pre code:focus": {
              outline: "none",
            },
            "pre code:focus-visible": {
              boxShadow: "var(--tw-prose-ring)",
            },
            ":is(.has-title, .demo) :is(pre, code)": {
              "@screen sm": {
                borderRadius: `0 0 ${theme("borderRadius.xl")} ${theme(
                  "borderRadius.xl",
                )}`,
              },
            },
            ".code-block:not(:is(.has-title, .demo)) :is(pre, code)": {
              "@screen sm": {
                borderRadius: theme("borderRadius.xl"),
              },
            },
            "pre code .line": {
              ...transition,
              transitionDuration: theme("transitionDuration.300"),
              transitionProperty:
                "height, border-color, background-color, clip-path",
              borderColor: "transparent",
              borderLeftWidth: theme("borderWidth.4"),
              clipPath: "inset(0 0 0 0)",
              display: "inline-block",
              height: theme("spacing.7"),
              marginInline: `calc(${theme("spacing.4")} * -1)`,
              paddingLeft: `calc(${theme("spacing.4")} - ${theme(
                "borderWidth.4",
              )})`,
              paddingRight: theme("spacing.4"),

              "@screen sm": {
                marginInline: `calc(${theme("spacing.8")} * -1)`,
                paddingLeft: `calc(${theme("spacing.8")} - ${theme(
                  "borderWidth.4",
                )})`,
                paddingRight: theme("spacing.8"),
              },
            },
            "pre:not(.collapsed) code .line:is(.highlight, .focus)": {
              width: `calc(100% + ${theme("spacing.8")})`,
              backgroundColor: "var(--tw-prose-hl-bg)",
              borderColor: "var(--tw-prose-hl-border)",

              "@screen sm": {
                width: `calc(100% + ${theme("spacing.16")})`,
              },
            },
            "pre.collapsed code .line:not(.focus)": {
              clipPath: "inset(100% 0 0 0)",
              height: 0,
            },

            // Horizontal rules
            hr: {
              marginTop: theme("spacing.20"),
              marginBottom: theme("spacing.20"),
              borderTopWidth: "1px",
              borderColor: "var(--tw-prose-hr)",

              "@screen lg": {
                marginLeft: `calc(${theme("spacing.12")} * -1)`,
                marginRight: `calc(${theme("spacing.12")} * -1)`,
              },
            },
          },
        },
      }
    },
  },
}
