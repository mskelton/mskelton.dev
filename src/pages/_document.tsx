import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        className="bg-gray-800 text-gray-300 font-sans leading-tight"
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
