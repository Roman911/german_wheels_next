import type { Metadata } from 'next';
import Filter from '@/components/Home/HomeFilter';
import Banner from '@/components/Home/Banner';
import TextSeo from '@/components/Home/TextSeo';
import Title from '@/components/Lib/Title';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
import { Language } from '@/models/language';
import Layout from '@/components/Layout';

async function getSettings() {
	const res = await fetch(`${ process.env.SERVER_URL }/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getProducts() {
	const res = await fetch(`${ process.env.SERVER_URL }/api/getProducts?vehicle_type=1&order[value]=popular&order[asc]=0`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
		body: JSON.stringify({ start: 0, length: 8 }),
	});
	return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = locale === Language.UK ? Language.UA : Language.RU;
	const response = await fetch(`${ process.env.SERVER_URL }/baseData/settings`)
		.then((res) => res.json());

	return {
		title: response[lang].meta_title,
		description: response[lang].meta_description,
	}
}

export default async function Home({ params }: { params: Promise<{ locale: Language }> }) {
	const locale = (await params).locale;
	const lang = locale === Language.UK ? Language.UA : Language.RU;
	const response = await getSettings();
	const products = await getProducts();

	return (
		<main>
			<Filter locale={ locale }/>
			<Layout>
				<Title title={ response[lang].h2_top }/>
				{ products.result ? <ProductList
					locale={ locale }
					classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
					data={ products.data }
				/> : <NoResult noResultText='no result'/> }
				<Banner/>
				<TextSeo description={ response[lang].description }/>
			</Layout>
		</main>
	);
};
