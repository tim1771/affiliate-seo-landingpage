import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Tool Finder for Small Business | Get Personalized AI Recommendations",
  description: "Stop guessing which AI tools are right for your business. Get personalized AI software recommendations matched to your industry, team size, and budget. Join the early access waitlist.",
  keywords: ["AI tools for small business", "AI software recommendations", "best AI tools 2026", "AI directory", "business automation", "AI tool finder"],
  authors: [{ name: "AI Directory" }],
  openGraph: {
    title: "Stop Guessing Which AI Tools Are Right for Your Business",
    description: "Get personalized AI tool recommendations matched to your business. Join the early access waitlist for free recommendations.",
    type: "website",
    locale: "en_US",
    siteName: "AI Tool Finder",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Finder for Small Business",
    description: "Get personalized AI recommendations matched to your industry, team size, and budget.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalytics gaId="G-87085FKS3N" />
        {/* Featured Partner Banner */}
        <div style={{
          background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
          color: 'white',
          textAlign: 'center',
          padding: '0.6rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <a href="/go/heygen" style={{ display: 'inline-block', width: '100%', textDecoration: 'none' }}>
            ✨ <span style={{ opacity: 0.9 }}>Featured Tool:</span> <b>HeyGen</b> — Create AI Avatars & Videos 10x Faster. <span style={{ textDecoration: 'underline' }}>Try for Free →</span>
          </a>
        </div>

        {children}
      </body>
    </html>
  );
}
