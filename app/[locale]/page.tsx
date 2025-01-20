import Filter from '@/components/Home/HomeFilter';
import FeaturedProducts from '@/components/Home/FeaturedProducts';
import Banner from '@/components/Home/Banner';
// import { TextSeo } from '@/components/Home/TextSeo';

async function getSettings() {
  const res = await fetch('https://admin.g-wheels.com.ua/baseData/settings', { method: 'GET' });
  return await res.json();
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const response = await getSettings();

  console.log( locale, response );

  return (
    <main>
      <Filter />
      <div className="container mx-auto px-4 py-5 min-h-[70vh]">
        <FeaturedProducts />
        <Banner />
        {/*<TextSeo />*/}
      </div>
    </main>
  );
}
