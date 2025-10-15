import type { Metadata } from 'next';
import Filter from '@/components/Home/HomeFilter';
import Banner from '@/components/Home/Banner';
import TextSeo from '@/components/Home/TextSeo';
import Title from '@/components/Lib/Title';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
import { Language, LanguageCode } from '@/models/language';
import Layout from '@/components/Layout';
import { getProducts, getSettings } from '@/app/api/api';
import { language } from '@/lib/language';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = language(locale);
	const settings = await getSettings();

	return {
		title: settings[lang].meta_title,
		description: settings[lang].meta_description,
		openGraph: {
			type: 'website',
			title: settings[lang].meta_title,
			description: settings[lang].meta_description,
			url: process.env.NEXT_PUBLIC_ACCESS_ORIGIN,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_ACCESS_ORIGIN}/logo.svg`,
					width: 1200,
					height: 630,
					alt: settings[lang].meta_title,
				},
			],
		},
		twitter: {
			card: settings[lang].meta_title,
			title: settings[lang].meta_title,
			description: settings[lang].meta_description,
		},
		generator: process.env.NEXT_PUBLIC_ACCESS_ORIGIN,
	}
}

export default async function Home({ params }: { params: Promise<{ locale: Language }> }) {
	const locale = (await params).locale;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await getSettings();
	const products = await getProducts('?vehicle_type=1&order[value]=popular&order[asc]=0', 0, 8);

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
