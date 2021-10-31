import Head from "next/head"
import { useRouter } from "next/router"
import metadata from "data/metadata"
import { AuthorFrontMatter, PostFrontMatter } from "types/FrontMatter"

interface CommonSEOProps {
  title: string
  description: string
  ogType: string
  ogImage: string | { "@type": string; url: string }[]
  twImage?: string
}

export function CommonSEO({
  description,
  ogImage,
  ogType,
  title,
  twImage,
}: CommonSEOProps) {
  const router = useRouter()

  return (
    <Head>
      <title>{title}</title>
      <meta content="follow, index" name="robots" />
      <meta content={description} name="description" />
      <meta content={`${metadata.siteUrl}${router.asPath}`} property="og:url" />
      <meta content={ogType} property="og:type" />
      <meta content={metadata.title} property="og:site_name" />
      <meta content={description} property="og:description" />
      <meta content={title} property="og:title" />
      {typeof ogImage === "string" ? (
        <meta key={ogImage} content={ogImage} property="og:image" />
      ) : (
        ogImage.map(({ url }) => (
          <meta key={url} content={url} property="og:image" />
        ))
      )}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={metadata.twitter} name="twitter:site" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      {twImage && <meta content={twImage} name="twitter:image" />}
    </Head>
  )
}

interface PageSEOProps {
  title: string
  description: string
}

export function PageSEO({ description, title }: PageSEOProps) {
  // const imageUrl = metadata.siteUrl + metadata.socialBanner

  return (
    <CommonSEO
      description={description}
      ogImage={[]}
      ogType="website"
      title={title}
      // twImage={imageUrl}
    />
  )
}

export function TagSEO({ description, title }: PageSEOProps) {
  const router = useRouter()
  // const imageUrl = metadata.siteUrl + metadata.socialBanner

  return (
    <>
      <CommonSEO
        description={description}
        ogImage={[]}
        ogType="website"
        title={title}
        // twImage={imageUrl}
      />

      <Head>
        <link
          href={`${metadata.siteUrl}${router.asPath}/feed.xml`}
          rel="alternate"
          title={`${description} - RSS feed`}
          type="application/rss+xml"
        />
      </Head>
    </>
  )
}

interface BlogSEOProps extends PostFrontMatter {
  authorDetails?: AuthorFrontMatter[]
  url: string
}

export const BlogSEO = ({
  date,
  images = [],
  lastmod,
  summary,
  title,
  url,
}: BlogSEOProps) => {
  const router = useRouter()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const imagesArr =
    images.length === 0
      ? [metadata.socialBanner]
      : typeof images === "string"
      ? [images]
      : images

  const featuredImages = imagesArr.map((img) => {
    return {
      "@type": "ImageObject",
      url: `${metadata.siteUrl}${img}`,
    }
  })

  const author = {
    "@type": "Person",
    name: metadata.author,
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    author,
    dateModified: modifiedAt,
    datePublished: publishedAt,
    description: summary,
    headline: title,
    image: featuredImages,
    mainEntityOfPage: {
      "@id": url,
      "@type": "WebPage",
    },
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: `${metadata.siteUrl}${metadata.siteLogo}`,
      },
      name: metadata.author,
    },
  }

  return (
    <>
      <CommonSEO
        description={summary ?? ""}
        ogImage={featuredImages}
        ogType="article"
        title={title}
        twImage={featuredImages[0].url}
      />

      <Head>
        <meta content={publishedAt} property="article:published_time" />
        {lastmod && (
          <meta content={modifiedAt} property="article:modified_time" />
        )}
        <link href={`${metadata.siteUrl}${router.asPath}`} rel="canonical" />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
          type="application/ld+json"
        />
      </Head>
    </>
  )
}
