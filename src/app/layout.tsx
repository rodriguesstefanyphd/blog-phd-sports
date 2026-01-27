import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Ph.D Sports | Blog de Notícias e Empreendedorismo",
  description: "Descubra as últimas novidades do mundo fitness, dicas de empreendedorismo e oportunidades de negócio com a Ph.D Sports - a maior rede de academias do Brasil.",
  keywords: "Ph.D Sports, franquia academia, empreendedorismo fitness, academia franquia, negócios fitness",
  openGraph: {
    title: "Ph.D Sports | Blog de Notícias",
    description: "Notícias e oportunidades de negócio no mundo fitness",
    images: ["https://www.academiaphdsports.com.br/logo-phd-sports.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
