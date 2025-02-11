import { Section } from '@/models/filter';
import { ProductProps } from '@/models/product';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProductComponent from '@/components/Product';
import { Language, LanguageCode } from '@/models/language';
import Layout from '@/components/Layout';
import TextSeo from '@/components/Home/TextSeo';
import type { Metadata } from 'next';

async function getSettings() {
	const res = await fetch(`${ process.env.SERVER_URL }/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getProduct(id: string): Promise<ProductProps> {
	const res = await fetch(`${ process.env.SERVER_URL }/api/getProduct/${ id }`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
	const { product } = await params;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const id = match ? match[1] : '';
	const response = await fetch(`${ process.env.SERVER_URL }/api/getProduct/${ id }`)
		.then((res) => res.json());

	return {
		title: response.data.full_name || '',
		description: response.data.full_name || '',
	}
}

export default async function Product({ params }: { params: Promise<{ locale: Language, product: string }> }) {
	const { locale, product } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const idProduct = match ? match[1] : '';
	const productResponse = await getProduct(idProduct);
	const settings = await getSettings();
	const section = /dia/.test(product) ? Section.Disks : Section.Tires;

	const path = [
		{
			title: section,
			translations: true,
			href: `/catalog/${ section }`
		},
		{
			title: productResponse?.data.full_name || '',
			translations: false,
			href: `/${ section }`
		}
	];

	return (
		<Layout>
			<Breadcrumbs path={ path }/>
			<ProductComponent
				idProduct={ idProduct }
				locale={ locale }
				data={ productResponse }
				section={ section }
				settings={ settings }
			/>
			<TextSeo description={ settings[lang].description }/>
		</Layout>
	)
};
