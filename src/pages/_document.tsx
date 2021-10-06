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
      <Html className="text-gray-900 leading-tight" lang="en">
        <Head />
        <body className="min-h-screen bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
