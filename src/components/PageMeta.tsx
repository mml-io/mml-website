import Head from "next/head";

const SITE_NAME = "MML - Metaverse Markup Language";
const SITE_URL = "https://mml.io";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo/mml-logomark-white-square-padding-512x512.png`;

type JsonLd = Record<string, unknown>;

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedDate?: string;
  jsonLd?: JsonLd | JsonLd[];
  noSuffix?: boolean;
};

export default function PageMeta({
  title,
  description,
  path,
  type = "website",
  image,
  publishedDate,
  jsonLd,
  noSuffix,
}: PageMetaProps) {
  const fullTitle = noSuffix ? title : `${title} - MML`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_OG_IMAGE;

  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {publishedDate && <meta property="article:published_time" content={publishedDate} />}

      {jsonLdItems.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
