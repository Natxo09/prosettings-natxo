import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RybbitScript } from "@/components/analytics/rybbit-script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cs2.natxo.dev'),

  title: {
    default: "Natxo - CS2 Settings",
    template: "%s | Natxo CS2"
  },

  description: "My personal CS2 settings and configurations",

  keywords: ['CS2', 'Counter-Strike 2', 'CS2 Settings', 'CS2 Config', 'Gaming Settings', 'Pro Settings'],

  authors: [{ name: 'Natxo' }],

  creator: 'Natxo',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cs2.natxo.dev',
    siteName: 'Natxo CS2',
    title: "Natxo - CS2 Settings",
    description: "My personal CS2 settings and configurations",
    images: [
      {
        url: '/meta.png',
        width: 1200,
        height: 630,
        alt: 'Natxo CS2 Settings',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "Natxo - CS2 Settings",
    description: "My personal CS2 settings and configurations",
    images: ['/meta.png'],
    creator: '@natxo',
  },

  alternates: {
    canonical: 'https://cs2.natxo.dev',
  },

  other: {
    // WhatsApp usa Open Graph, pero estos tags adicionales mejoran la compatibilidad
    'og:image:width': '1200',
    'og:image:height': '630',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <RybbitScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
