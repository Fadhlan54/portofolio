import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { StructuredData } from "@/components/structuredData";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Fadhlan Aziz - Fullstack Web Developer",
  description:
    "Muhammad Fadhlan Aziz - Fullstack Web Developer specializing in React.js, Next.js, Golang, and Express.js. Portfolio showcasing projects, skills, and experience.",
  keywords:
    "Muhammad Fadhlan Aziz, Fullstack Developer, React.js, Next.js, Golang, Web Developer, Portfolio, Indonesia",
  authors: [{ name: "Muhammad Fadhlan Aziz" }],
  creator: "Muhammad Fadhlan Aziz",
  publisher: "Muhammad Fadhlan Aziz",
  openGraph: {
    title: "Muhammad Fadhlan Aziz - Fullstack Web Developer",
    description:
      "Fullstack Web Developer specializing in React.js, Next.js, Golang, and Express.js",
    url: "https://www.fadhlanaz.my.id",
    siteName: "Muhammad Fadhlan Aziz Portfolio",
    images: [
      {
        url: "https://www.fadhlanaz.my.id/images/photo-profile-1x1.png",
        width: 832,
        height: 832,
        alt: "Muhammad Fadhlan Aziz - Fullstack Developer",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Fadhlan Aziz - Fullstack Developer",
    description:
      "Fullstack Web Developer specializing in React.js, Next.js, Golang",
    images: ["https://www.fadhlanaz.my.id/images/photo-profile-1x1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-search-console-verification-code",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
