import Script from 'next/script';

export function RybbitScript() {
  const scriptUrl = process.env.NEXT_PUBLIC_RYBBIT_SCRIPT_URL;
  const siteId = process.env.NEXT_PUBLIC_RYBBIT_SITE_ID;
  const apiKey = process.env.NEXT_PUBLIC_RYBBIT_API_KEY;

  // Don't render if required env variables are missing
  if (!scriptUrl || !siteId) {
    console.warn('Rybbit analytics: Missing required environment variables');
    return null;
  }

  // Build data attributes object
  const dataAttributes: Record<string, string> = {
    'data-site-id': siteId,
  };

  // Only add API key in development (for localhost tracking)
  if (apiKey && process.env.NODE_ENV === 'development') {
    dataAttributes['data-api-key'] = apiKey;
  }

  return (
    <Script
      src={scriptUrl}
      strategy="afterInteractive"
      {...dataAttributes}
    />
  );
}
