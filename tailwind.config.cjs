/* eslint-disable sort/object-properties, @typescript-eslint/no-require-imports */
const plugin = require("tailwindcss/plugin")

/** @type {import("tailwindcss").Config} */
module.exports = {
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        ".focusable": {
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            boxShadow: `0 0 0 3px ${theme("colors.indigo.500")}`,
          },
        },
      })
    }),
  ],
  theme: {
    typography: (theme) => {
      const transition = {
        transitionProperty: theme("transitionProperty.colors"),
        transitionDuration: theme("transitionDuration.150"),
        transitionTimingFunction: theme("transitionTimingFunction.in-out"),
      }

      const font = (size) => {
        const [fontSize, { lineHeight }] = theme(`fontSize.${size}`)
        return { fontSize, lineHeight }
      }

      return {
        invert: {
          css: {
            "--tw-prose-body": theme("colors.zinc.300"),
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
            "--tw-prose-pre-bg": theme("colors.zinc.950"),
            "--tw-prose-code": theme("colors.zinc.300"),
            "--tw-prose-code-bg": theme("colors.zinc.800"),
            "--tw-prose-code-border": theme("colors.zinc.700"),
            "--tw-prose-code-link": theme("colors.indigo.400"),
            "--tw-prose-code-link-hover": theme("colors.indigo.500"),
            "--tw-prose-kbd": theme("colors.zinc.300"),
            "--tw-prose-kbd-bg": theme("colors.zinc.800"),
            "--tw-prose-kbd-borders": theme("colors.zinc.700"),
            "--tw-prose-hl-bg": theme("colors.slate.800 / 50%"),
            "--tw-prose-hl-border": theme("colors.indigo.500"),
            ":is(.shiki, .shiki span)": {
              color: "var(--shiki-dark) !important",
            },
          },
        },
        DEFAULT: {
          css: {
            "--tw-prose-ring": `0 0 0 3px ${theme("colors.indigo.500")}`,
            "--tw-prose-body": theme("colors.zinc.700"),
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
            "--tw-prose-code-bg": theme("colors.zinc.100"),
            "--tw-prose-code-border": theme("colors.zinc.300"),
            "--tw-prose-code-link": theme("colors.indigo.600"),
            "--tw-prose-code-link-hover": theme("colors.indigo.500"),
            "--tw-prose-pre-bg": theme("colors.white"),
            "--tw-prose-kbd": theme("colors.zinc.700"),
            "--tw-prose-kbd-bg": theme("colors.zinc.50"),
            "--tw-prose-kbd-borders": theme("colors.zinc.200"),
            "--tw-prose-hl-bg": theme("colors.indigo.200 / 50%"),
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
              boxDecorationBreak: "clone",
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
            ":is(p, li, aside) code": {
              ...transition,
              backgroundColor: "var(--tw-prose-code-bg)",
              borderColor: "var(--tw-prose-code-border)",
              borderRadius: theme("borderRadius.md"),
              borderWidth: theme("borderWidth.DEFAULT"),
              color: "var(--tw-prose-code)",
              display: "inline-block",
              fontSize: theme("fontSize.xs")[0],
              fontWeight: theme("fontWeight.semibold"),
              lineHeight: theme("lineHeight.5"),
              paddingInline: theme("spacing.1"),
            },
            "a code": {
              color: "var(--tw-prose-code-link)",
            },
            "a:has(code):hover code": {
              color: "var(--tw-prose-code-link-hover)",
            },
            "a:has(code):focus-visible code": {
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
              marginTop: theme("spacing.4"),
            },
            li: {
              marginTop: theme("spacing.2"),
              marginBottom: theme("spacing.2"),
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

            // Code block is a wrapper around the `pre` tag as well as the title
            // and copy button.
            ".code-block": {
              position: "relative",
              marginBottom: theme("spacing.8"),
              marginTop: 0,
              marginInline: `calc(${theme("spacing.4")} * -1)`,
              "@screen sm": {
                marginInline: 0,
              },
            },
            ".code-block.has-title": {
              paddingTop: theme("spacing.12"),
            },

            // When a code block follows a paragraph, reduce the margin a touch
            // to make it feel more connected.
            "p:has(+ .code-block)": {
              marginBottom: theme("spacing.4"),
            },

            pre: {
              // Shiki applies the background color of the theme to the `pre`
              // tag. However, I override this color and thus need to set it to
              // transparent otherwise a very subtle white background will slip
              // through the border radius.
              backgroundColor: "transparent !important",
              fontSize: theme("fontSize.sm")[0],
            },
            "pre code": {
              ...font("xs"),
              backgroundColor: "var(--tw-prose-pre-bg)",
              borderRadius: 0,
              border: "solid var(--tw-prose-code-border)",
              borderWidth: "1px 0 1px 0",
              display: "grid",
              fontWeight: "inherit",
              isolation: "isolate",
              overflowX: "auto",
              padding: theme("spacing.4"),
              "@screen sm": {
                borderWidth: "1px",
              },
            },

            // Use a custom focus ring for code blocks
            "pre code:focus": {
              outline: "none",
            },
            "pre code:focus-visible": {
              boxShadow: "var(--tw-prose-ring)",
            },

            ":is(.has-title, .demo) :is(pre, code)": {
              borderRadius: 0,
              "@screen sm": {
                borderRadius: `0 0 ${theme("borderRadius.lg")} ${theme(
                  "borderRadius.lg",
                )}`,
              },
            },
            ".code-block:not(:is(.has-title, .demo)) :is(pre, code)": {
              borderRadius: 0,
              "@screen sm": {
                borderRadius: theme("borderRadius.lg"),
              },
            },
            "pre code .line": {
              ...transition,
              transitionDuration: theme("transitionDuration.300"),
              transitionProperty:
                "height, border-color, background-color, clip-path",
              borderColor: "transparent",
              borderLeftWidth: theme("borderWidth.4"),
              // This causes slight gap between lines
              // clipPath: "inset(0 0 0 0)",
              display: "inline-block",
              height: `calc(${theme("lineHeight.6")} + 1px)`,
              marginInline: `calc(${theme("spacing.4")} * -1)`,
              paddingLeft: `calc(${theme("spacing.4")} - ${theme(
                "borderWidth.4",
              )})`,
              paddingRight: theme("spacing.4"),
            },
            // Highlighted lines
            "pre:not(.collapsed) code .line:is(.highlight, .focus)": {
              width: `calc(100% + ${theme("spacing.8")})`,
              backgroundColor: "var(--tw-prose-hl-bg)",
              borderColor: "var(--tw-prose-hl-border)",
            },

            // Collapse non-focused lines
            "pre.collapsed code .line:not(.focus)": {
              clipPath: "inset(100% 0 0 0)",
              height: 0,
            },

            // Line numbers
            "pre.line-numbers code": {
              counterReset: "line",

              "@screen md": {
                ".line:before": {
                  display: "inline-block",
                  counterIncrement: "line",
                  width: theme("spacing.4"),
                  fontSize: theme("fontSize.xs")[0],
                  color: theme("colors.zinc.400"),
                  userSelect: "none",
                  textAlign: "right",
                  flexShrink: 0,
                  marginRight: theme("spacing.4"),
                  content: "counter(line)",
                },
              },
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
