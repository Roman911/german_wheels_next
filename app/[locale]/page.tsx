import Filter from '@/components/Home/HomeFilter';
import FeaturedProducts from '@/components/Home/FeaturedProducts';
import Banner from '@/components/Home/Banner';
import TextSeo from '@/components/Home/TextSeo';

export default async function Home({ params: { locale }, }: Readonly<{ params: { locale: string } }>) {
  return (
    <main>
      <Filter />
      <div className='container mx-auto px-4 py-5 min-h-[70vh]'>
        <FeaturedProducts locale={ locale } />
        <Banner locale={ locale } />
        <TextSeo locale={ locale } />
      </div>
    </main>
  );
};
