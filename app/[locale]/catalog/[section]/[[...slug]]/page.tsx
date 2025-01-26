import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';
import { Language } from '@/models/language';
import Title from '@/components/Lib/Title';
import FilterAlt from '@/components/Catalog/FilterAlt';
import { Section } from '@/models/filter';
import { BaseDataProps } from '@/models/baseData';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
// import FilterByCar from '@/components/Catalog/FilterByCar';
import { transformUrl } from './transformUrl';
import SelectionByCar from '@/components/Catalog/SelectionByCar';
import FilterActive from '@/components/Catalog/FilterActive';
// import { useAppGetProductsForCatalog } from '@/hooks/getProductsForCatalog';

async function getFilterData(id: string): Promise<BaseDataProps> {
	const res = await fetch(`${process.env.SERVER_URL}/api/FildterData/${id}`, {
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

export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: Section, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const filterData = await getFilterData(`?typeproduct=${section === Section.Tires ? 1 : 3}`);
	const products = await getProducts();
	const paramsUrl = transformUrl({ section, slug });
	console.log(paramsUrl);

	const path = [
		{
			title: section || '',
			translations: true,
			href: `/catalog/${section}/`,
		},
		{
			title: '',
			translations: false,
			href: `/catalog/`,
		},
		// {
		// 	id: 2,
		// 	title: `${t(SeasonTransform(urlParams.sezon ?? '')?.name || '', true)} ${t(section)}`,
		// 	url: urlParams.sezon ? `/catalog/${section}/s-${urlParams.sezon}` : undefined,
		// },
		// {
		// 	id: 3,
		// 	title: `${typeof brandParam === 'object' && brandParam?.label ? brandParam.label : ''}`,
		// 	url: urlParams.brand ? `/catalog/${section}/b-${urlParams.brand}` : undefined,
		// },
		// {
		// 	id: 4,
		// 	title: `${t('width')} ${urlParams.width}`,
		// 	url: urlParams.width && `/catalog/${section}/w-${urlParams.width}`,
		// },
		// {
		// 	id: 5,
		// 	title: `${t('height', true)} ${urlParams.height}`,
		// 	url: urlParams.height && `/catalog/${section}/h-${urlParams.height}`,
		// },
		// {
		// 	id: 6,
		// 	title: `R${urlParams.radius}`,
		// 	url: urlParams.radius && `/catalog/${section}/d-${urlParams.radius}`,
		// },
		// {
		// 	id: 7,
		// 	title: `${title}`,
		// 	url: Object.keys(urlParams).length > 1 && `/catalog/${section}/`,
		// },
	];

	return (
		<Layout>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title={ 'qqqq' } className='mt-3 text-lg font-medium px-0 md:px-3 mb-3 md:mb-1' />
			<div className='py-5 lg:flex lg:gap-10'>
				<FilterAlt filterData={ filterData } />
				<div className='flex-1 lg:-mt-12'>
					{/*<FilterByCar locale={ locale } />*/}
					<SelectionByCar locale={ locale } />
					<FilterActive locale={ locale } className='hidden lg:flex' slug={ slug } />
					{ products.result ? <ProductList
						locale={ locale }
						classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
						data={ products.data }
					/> : <NoResult noResultText='no result' /> }
				</div>
			</div>
		</Layout>
	)
};
