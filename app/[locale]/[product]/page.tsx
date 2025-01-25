import { Section } from '@/models/filter';
import { ProductProps } from '@/models/product';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProductComponent from '@/components/Product';
import { Language } from '@/models/language';

async function getProduct(id: string): Promise<ProductProps> {
	const res = await fetch(`https://admin.g-wheels.com.ua/api/getProduct/${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function Product({ params }: { params: Promise<{ locale: Language, product: string }> }) {
	const { locale, product } = await params;
	const productResponse = await getProduct('2964');
	const section = /dia/.test(product) ? Section.Disks : Section.Tires;

	console.log(locale, product, productResponse, section);

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
		<section className='product container mx-auto px-4 py-5 min-h-[70vh]'>
			<Breadcrumbs path={ path } />
			<ProductComponent />
		</section>
	)
};
