import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seja um Franqueado Ph.D Sports | Oportunidade de Negócio Fitness',
  description: 'Torne-se um franqueado Ph.D Sports e faça parte da maior rede de academias do Brasil. Investimento a partir de R$ 300.000 com retorno comprovado. Suporte completo e marca consolidada.',
  keywords: [
    'franquia academia', 'franquia Ph.D Sports', 'franquia fitness',
    'investimento academia', 'negócio fitness', 'abrir academia',
    'franquia low cost', 'franquia rentável', 'empreender fitness'
  ],
  openGraph: {
    title: 'Seja um Franqueado Ph.D Sports',
    description: 'Invista em uma franquia Ph.D Sports e tenha seu próprio negócio no mercado fitness que mais cresce no Brasil.',
    url: 'https://noticias.academiaphdsports.com.br/franqueado',
    type: 'website',
    images: [
      {
        url: 'https://www.academiaphdsports.com.br/logo-phd-sports.png',
        width: 1200,
        height: 630,
        alt: 'Ph.D Sports - Seja um Franqueado',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seja um Franqueado Ph.D Sports',
    description: 'Invista em uma franquia fitness de sucesso',
  },
  alternates: {
    canonical: 'https://noticias.academiaphdsports.com.br/franqueado',
  },
};

// Schema.org para página de franquia
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Seja um Franqueado Ph.D Sports',
  description: 'Página de franquias da Ph.D Sports',
  url: 'https://noticias.academiaphdsports.com.br/franqueado',
  mainEntity: {
    '@type': 'Offer',
    name: 'Franquia Ph.D Sports',
    description: 'Oportunidade de franquia no mercado fitness',
    seller: {
      '@type': 'Organization',
      name: 'Ph.D Sports',
      url: 'https://www.academiaphdsports.com.br'
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: '300000',
      priceCurrency: 'BRL',
      description: 'Investimento inicial a partir de'
    }
  }
};

export default function FranqueadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
