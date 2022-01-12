const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  darkMode: "class",
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
  purge: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        primary: colors.teal,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
      },
      spacing: {
        "9/16": "56.25%",
      },
      typography: (theme) => ({
        dark: {
          css: {
            a: {
              "&:hover": {
                color: theme("colors.primary.400"),
              },
              code: { color: theme("colors.primary.400") },
              color: theme("colors.primary.500"),
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.100"),
            },
            code: {
              backgroundColor: theme("colors.gray.800"),
            },
            color: theme("colors.gray.300"),
            details: {
              backgroundColor: theme("colors.gray.800"),
            },
            h1: {
              color: theme("colors.gray.100"),
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h2: {
              color: theme("colors.gray.100"),
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h3: {
              color: theme("colors.gray.100"),
              fontWeight: "600",
            },
            "h4,h5,h6": {
              color: theme("colors.gray.100"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            "ol li:before": {
              color: theme("colors.gray.400"),
              fontWeight: "600",
            },
            strong: { color: theme("colors.gray.100") },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
            thead: {
              color: theme("colors.gray.100"),
            },
            "ul li:before": {
              backgroundColor: theme("colors.gray.400"),
            },
          },
        },
        DEFAULT: {
          css: {
            a: {
              "&:hover": {
                color: theme("colors.primary.600"),
              },
              code: { color: theme("colors.primary.400") },
              color: theme("colors.primary.500"),
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.200"),
              color: theme("colors.gray.900"),
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: "0.25rem",
              color: theme("colors.pink.500"),
              paddingBottom: "2px",
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
            },
            color: theme("colors.gray.700"),
            details: {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: "0.25rem",
              paddingBottom: "2px",
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "2px",
            },
            h1: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h2: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h3: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
            },
            "h4,h5,h6": {
              color: theme("colors.gray.900"),
            },
            hr: { borderColor: theme("colors.gray.200") },
            "ol li:before": {
              color: theme("colors.gray.500"),
              fontWeight: "600",
            },
            strong: { color: theme("colors.gray.600") },
            "ul li:before": {
              backgroundColor: theme("colors.gray.500"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
}
