import { Helmet } from "react-helmet-async";

interface SeoHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SeoHelmet({
  title = "ASBL Hope Action Jeunesse - Lutte contre le harcèlement",
  description = "Hope Action Jeunesse œuvre pour un environnement sûr et respectueux, en soutenant ceux qui souffrent par des actions concrètes contre le harcèlement, la précarité et l'isolement.",
  keywords = "harcèlement, cyber-harcèlement, ASBL, Hope, jeunesse, sensibilisation, éducation, prévention, Belgique",
  image = "/og-image.jpg",
  url = "https://www.asbl-hope.org",
  type = "website",
}: SeoHelmetProps) {
  const fullTitle = title.includes("ASBL Hope")
    ? title
    : `${title} | ASBL Hope Action Jeunesse`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="French" />
      <meta name="author" content="ASBL Hope Action Jeunesse" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
