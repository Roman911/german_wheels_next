import { Section } from '@/models/filter';
import { ProductProps } from '@/models/product';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProductComponent from '@/components/Product';
import { Language } from '@/models/language';
import Layout from '@/components/Layout';

async function getSettings() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getProduct(id: string): Promise<ProductProps> {
	const res = await fetch(`${process.env.SERVER_URL}/api/getProduct/${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function Product({ params }: { params: Promise<{ locale: Language, product: string }> }) {
	const { locale, product } = await params;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const idProduct = match ? match[1] : '';
	const productResponse = await getProduct(idProduct);
	const settings = await getSettings();
	const section = /dia/.test(product) ? Section.Disks : Section.Tires;

	const path = [
		{
			title: section,
			translations: true,
			href: `/catalog/${section}`
		},
		{
			title: productResponse?.data.full_name || '',
			translations: false,
			href: `/${section}`
		}
	];

	return (
		<Layout>
			<Breadcrumbs path={ path } />
			<ProductComponent
				idProduct={ idProduct }
				locale={ locale }
				data={ productResponse }
				section={ section }
				settings={ settings }
			/>
		</Layout>
	)
};
