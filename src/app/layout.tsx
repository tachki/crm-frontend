import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import { Providers } from "./providers";

const zen = Montserrat({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
  title: "tachki",
  description: "агрегатор автопарков",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${zen.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
