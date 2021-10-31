import metadata from "data/metadata"
import { escape } from "lib/utils/htmlEscaper"
import { PostFrontMatter } from "types/FrontMatter"

const generateRssItem = (post: PostFrontMatter) => `
  <item>
    <guid>${metadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${metadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${metadata.email} (${metadata.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join("")}
  </item>
`

const generateRss = (posts: PostFrontMatter[], page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(metadata.title)}</title>
      <link>${metadata.siteUrl}/blog</link>
      <description>${escape(metadata.description)}</description>
      <language>${metadata.language}</language>
      <managingEditor>${metadata.email} (${metadata.author})</managingEditor>
      <webMaster>${metadata.email} (${metadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
        metadata.siteUrl
      }/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join("")}
    </channel>
  </rss>
`

export default generateRss
