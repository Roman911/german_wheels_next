import type { Metadata } from 'next';
import Filter from '@/components/Home/HomeFilter';
import Banner from '@/components/Home/Banner';
import TextSeo from '@/components/Home/TextSeo';
import Title from '@/components/Lib/Title';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
import { Language } from '@/models/language';

async function getSettings() {
  const res = await fetch(`${process.env.SERVER_URL}/baseData/settings`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Credentials': 'true',
    }
  });
  return await res.json();
}

async function getProducts() {
  const res = await fetch(`${process.env.SERVER_URL}/api/getProducts?vehicle_type=1&order[value]=popular&order[asc]=0`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Credentials': 'true',
    }
  });
  return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
  const { locale } = await params;
  const response = await fetch(`${process.env.SERVER_URL}/baseData/settings`)
    .then((res) => res.json());

  return {
    title: response[locale].shablon_title,
    description: response[locale].shablon_title,
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const response = await getSettings();
  const products = await getProducts();

  return (
    <main>
      <Filter locale={ locale } />
      <div className="container mx-auto px-4 py-5 min-h-[70vh]">
        <Title title={ response[locale].h2_top }/>
        { products.result ? <ProductList
          locale={ locale }
          classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          data={ products.data }
        /> : <NoResult noResultText='no result' /> }
        <Banner />
        <TextSeo description={response[locale].description} />
      </div>
    </main>
  );
}