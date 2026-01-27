import noticias from '@/data/noticias.json';
import NoticiaClient from './NoticiaClient';
import Link from 'next/link';

export function generateStaticParams() {
  return noticias.noticias.map((noticia) => ({
    id: String(noticia.id),
  }));
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

  return <NoticiaClient noticia={noticia} outrasNoticias={outrasNoticias} />;
}
