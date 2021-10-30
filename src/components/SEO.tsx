import Head from "next/head"
import { useRouter } from "next/router"
import siteMetadata from "data/siteMetadata"

export function CommonSEO({ description, ogImage, ogType, title, twImage }) {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta content="follow, index" name="robots" />
      <meta content={description} name="description" />
      <meta
        content={`${siteMetadata.siteUrl}${router.asPath}`}
        property="og:url"
      />
      <meta content={ogType} property="og:type" />
      <meta content={siteMetadata.title} property="og:site_name" />
      <meta content={description} property="og:description" />
      <meta content={title} property="og:title" />
      {ogImage.constructor.name === "Array" ? (
        ogImage.map(({ url }) => (
          <meta key={url} content={url} property="og:image" />
        ))
      ) : (
        <meta key={ogImage} content={ogImage} property="og:image" />
      )}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={siteMetadata.twitter} name="twitter:site" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={twImage} name="twitter:image" />
    </Head>
  )
}

export function PageSEO({ description, title }) {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  return (
    <CommonSEO
      description={description}
      ogImage={ogImageUrl}
      ogType="website"
      title={title}
      twImage={twImageUrl}
    />
  )
}

export function TagSEO({ description, title }) {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        description={description}
        ogImage={ogImageUrl}
        ogType="website"
        title={title}
        twImage={twImageUrl}
      />
      <Head>
        <link
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
          rel="alternate"
          title={`${description} - RSS feed`}
          type="application/rss+xml"
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({
  authorDetails,
  date,
  images = [],
  lastmod,
  summary,
  title,
  url,
}) => {
  const router = useRouter()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === "string"
      ? [images]
      : images

  const featuredImages = imagesArr.map((img) => {
    return {
      "@type": "ImageObject",
      url: `${siteMetadata.siteUrl}${img}`,
    }
  })

  let authorList
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        "@type": "Person",
        name: author.name,
      }
    })
  } else {
    authorList = {
      "@type": "Person",
      name: siteMetadata.author,
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: authorList,
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
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
      name: siteMetadata.author,
    },
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        description={summary}
        ogImage={featuredImages}
        ogType="article"
        title={title}
        twImage={twImageUrl}
      />
      <Head>
        {date && (
          <meta content={publishedAt} property="article:published_time" />
        )}
        {lastmod && (
          <meta content={modifiedAt} property="article:modified_time" />
        )}
        <link
          href={`${siteMetadata.siteUrl}${router.asPath}`}
          rel="canonical"
        />
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
