import { Metadata } from 'next';
import noticias from '@/data/noticias.json';
import NoticiaClient from './NoticiaClient';
import Link from 'next/link';

export function generateStaticParams() {
  return noticias.noticias.map((noticia) => ({
    id: String(noticia.id),
  }));
}

// Gerar metadata dinâmico para SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const noticia = noticias.noticias.find(n => n.id === Number(id));
  
  if (!noticia) {
    return {
      title: 'Notícia não encontrada',
    };
  }

  const url = `https://noticias.academiaphdsports.com.br/noticia/${noticia.id}`;
  const imageUrl = noticia.imagem.startsWith('http') 
    ? noticia.imagem 
    : `https://noticias.academiaphdsports.com.br${noticia.imagem}`;

  return {
    title: noticia.titulo,
    description: noticia.resumo,
    keywords: [
      noticia.categoria,
      'Ph.D Sports',
      'fitness',
      'academia',
      'franquia',
      ...noticia.titulo.split(' ').filter(word => word.length > 4)
    ],
    authors: [{ name: noticia.autor }],
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: url,
      title: noticia.titulo,
      description: noticia.resumo,
      siteName: 'Ph.D Sports Blog',
      publishedTime: noticia.data,
      authors: [noticia.autor],
      section: noticia.categoria,
      tags: [noticia.categoria, 'fitness', 'empreendedorismo', 'academia'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: noticia.titulo,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.titulo,
      description: noticia.resumo,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoticiaPage({ params }: Props) {
  const { id } = await params;
  const noticia = noticias.noticias.find(n => n.id === Number(id));

  if (!noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#131d2f] mb-4">Notícia não encontrada</h1>
          <Link href="/" className="text-[#ffdc61] hover:underline">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  const outrasNoticias = noticias.noticias.filter(n => n.id !== noticia.id).slice(0, 3);

  // Schema.org JSON-LD para o artigo
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: noticia.titulo,
    description: noticia.resumo,
    image: noticia.imagem.startsWith('http') 
      ? noticia.imagem 
      : `https://noticias.academiaphdsports.com.br${noticia.imagem}`,
    datePublished: noticia.data,
    dateModified: noticia.data,
    author: {
      '@type': 'Person',
      name: noticia.autor,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ph.D Sports',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.academiaphdsports.com.br/logo-phd-sports.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://noticias.academiaphdsports.com.br/noticia/${noticia.id}`
    },
    articleSection: noticia.categoria,
    keywords: [noticia.categoria, 'fitness', 'academia', 'franquia', 'Ph.D Sports'].join(', '),
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
  };

  // BreadcrumbList para navegação estruturada
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://noticias.academiaphdsports.com.br'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: noticia.categoria,
        item: `https://noticias.academiaphdsports.com.br/?categoria=${encodeURIComponent(noticia.categoria)}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: noticia.titulo,
        item: `https://noticias.academiaphdsports.com.br/noticia/${noticia.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NoticiaClient noticia={noticia} outrasNoticias={outrasNoticias} />
    </>
  );
}
