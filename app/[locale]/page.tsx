import Filter from '@/components/Home/HomeFilter';
import Banner from '@/components/Home/Banner';
import TextSeo from '@/components/Home/TextSeo';
import Title from '@/components/Lib/Title';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';

async function getSettings() {
  const res = await fetch('https://admin.g-wheels.com.ua/baseData/settings', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Credentials': 'true',
    }
  });
  return await res.json();
}

async function getProducts() {
  const res = await fetch('https://admin.g-wheels.com.ua/api/getProducts?vehicle_type=1&order[value]=popular&order[asc]=0', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Credentials': 'true',
    }
  });
  return await res.json();
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const response = await getSettings();
  const products = await getProducts();

  // console.log(locale, response, products);

  return (
    <main>
      <Filter />
      <div className="container mx-auto px-4 py-5 min-h-[70vh]">
        <Title title={ response[locale].h2_top }/>
        { products.result ? <ProductList
          locale={ locale }
          classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5'
          data={ products.data }
        /> : <NoResult noResultText='no result' /> }
        <Banner />
        <TextSeo description={response[locale].description} />
      </div>
    </main>
  );
}