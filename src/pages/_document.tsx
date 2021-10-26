import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        className="bg-gray-900 text-gray-300 font-sans leading-tight"
        lang="en"
      >
        <Head />
        <body className="min-h-screen py-8 px-6 sm:py-12 sm:px-16 md:py-20 md:px-16">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
