import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "iOS News App",
  description: "A modern iOS-style news application built with Next.js",
  applicationName: "iOS News App",
  authors: [{ name: "Next.js Developer" }],
  keywords: ["news", "ios", "mobile", "app", "nextjs"],
  creator: "Next.js Developer",
  publisher: "Vercel",
  formatDetection: {
    telephone: false,
  },
  generator: 'v0.dev',
  metadataBase: new URL('https://your-app-domain.com'),
  openGraph: {
    title: "iOS News App",
    description: "A modern iOS-style news application built with Next.js",
    type: "website",
    locale: "en_US",
    url: "https://your-app-domain.com",
    siteName: "iOS News App",
  },
  twitter: {
    card: "summary_large_image",
    title: "iOS News App",
    description: "A modern iOS-style news application built with Next.js",
    creator: "@nextjs_dev",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#f7f7f7" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}