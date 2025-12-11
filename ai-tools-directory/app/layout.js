import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Tools Directory - Find the Best AI Software",
  description: "Compare and discover the top AI tools for productivity, marketing, and coding.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
