import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'HomeLife';
const BASE_URL = 'https://www.homelife.com.co';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * useSEO — Inject per-page SEO metadata using react-helmet-async.
 *
 * @param {object} options
 * @param {string} options.title          - Page title (will be appended with " | HomeLife")
 * @param {string} options.description    - Meta description (max ~155 chars)
 * @param {string} [options.canonical]    - Full canonical URL (defaults to BASE_URL)
 * @param {string} [options.image]        - OG image URL
 * @param {boolean} [options.noIndex]     - If true, adds noindex,nofollow
 */
const useSEO = ({ title, description, canonical, image, noIndex = false }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Equipos Médicos Certificados INVIMA`;
  const ogImage = image || DEFAULT_IMAGE;
  const canonicalUrl = canonical || BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />
      }

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default useSEO;
