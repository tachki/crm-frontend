import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { QueryClient } from "@tanstack/react-query";
import { Providers } from "./providers";

const zen = Inter({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
  title: "uCar",
  description: "Кар-шеринг",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${zen.variable} antialiased`}
      >
        {/* <QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider> */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}