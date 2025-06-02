import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Roxom - Compete. Win. Earn real BTC.",
  description: "We give you 0.5 paper BTC to trade—zero risk, all the rewards. Compete every week for a chance to win up to 1000 USD in BTC.",
  keywords: "Bitcoin, trading, competitions, BTC, rewards, crypto, trading competition, paper trading, Bitcoin exchange",
  authors: [{ name: "Roxom Team" }],
  openGraph: {
    title: "Roxom - Compete. Win. Earn real BTC.",
    description: "The world's first Bitcoin trading competition platform. Zero risk, all the rewards.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roxom - Compete. Win. Earn real BTC.",
    description: "The world's first Bitcoin trading competition platform. Zero risk, all the rewards.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
