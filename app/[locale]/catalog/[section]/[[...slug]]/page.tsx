import Layout from '@/components/Layout';
import { Language } from '@/models/language';
import FilterAlt from '@/components/Catalog/FilterAlt';
import { Section } from '@/models/filter';
import { BaseDataProps } from '@/models/baseData';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
import FilterByCar from '@/components/Catalog/FilterByCar';
import { transformUrl } from './transformUrl';
import SelectionByCar from '@/components/Catalog/SelectionByCar';
import FilterActive from '@/components/Catalog/FilterActive';
import HeaderCatalog from '@/components/Catalog/HeaderCatalog';
import Pagination from '@/components/Catalog/Pagination';

const pageItem = 12;

async function getFilterData(id: string): Promise<BaseDataProps> {
	const res = await fetch(`${process.env.SERVER_URL}/api/FildterData/${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getProducts({ page, searchParams }: { page: number | null, searchParams: string }) {
	const res = await fetch(`${process.env.SERVER_URL}/api/getProducts?${searchParams}`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
		body: JSON.stringify({ start: page || 0, length: 12 }),
	});
	return await res.json();
}

export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: Section, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const value = slug?.find(item => item.startsWith('p-'));
	const page = value ? parseInt(value.split('-')[1], 10) : null;
	const filterData = await getFilterData(
		`?typeproduct=${section === Section.Tires ? 1 : 3}`,
	);
	const paramsUrl = transformUrl({ section, slug });
	const products = await getProducts({ page, searchParams: paramsUrl });

	return (
		<Layout>
			<HeaderCatalog locale={ locale } section={ section } slug={ slug } />
			<div className='py-5 lg:flex lg:gap-10'>
				<FilterAlt locale={ locale } filterData={ filterData } section={ section } />
				<div className='flex-1 -mt-8 lg:-mt-12'>
					<FilterByCar locale={ locale } section={ section } />
					<SelectionByCar locale={ locale } />
					<FilterActive locale={ locale } className='hidden lg:flex' slug={ slug } />
					{ products.result ? <ProductList
						locale={ locale }
						classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
						data={ products.data }
					/> : <NoResult noResultText='no result' /> }
					{ products.result && products.data.total_count > pageItem && <div className='mt-10 flex justify-center'>
						<Pagination initialPage={ page || 1 } total={ products.data.total_count/pageItem } />
					</div> }
				</div>
			</div>
		</Layout>
	)
};
