import Layout from '@/components/Layout';
import { Language, LanguageCode } from '@/models/language';
import FilterAlt from '@/components/Catalog/FilterAlt';
import { Section } from '@/models/filter';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/Lib/NoResult';
import FilterByCar from '@/components/Catalog/FilterByCar';
import { transformUrl } from './transformUrl';
import SelectionByCar from '@/components/Catalog/SelectionByCar';
import FilterActive from '@/components/Catalog/FilterActive';
import HeaderCatalog from '@/components/Catalog/HeaderCatalog';
import Pagination from '@/components/Catalog/Pagination';
import { getFilterData, getProducts } from '@/app/api/api';
import type { Metadata } from 'next';

const pageItem = 12;
const sort = {
	ch: '&order[asc]=1',
	ex: '&order[asc]=0',
	pop: '&order[value]=popular&order[asc]=0',
	off: '&order[value]=offers'
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const response = await fetch(`${process.env.SERVER_URL}/baseData/settings`)
		.then((res) => res.json());

	return {
		title: response[locale === Language.UK ? LanguageCode.UA : Language.RU].meta_title,
		description: response[locale === Language.UK ? LanguageCode.UA : Language.RU].meta_description,
	}
}

export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: Section, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const value = slug?.find(item => item.startsWith('p-'));
	const page = value ? parseInt(value.split('-')[1], 10) : null;
	const filterData = await getFilterData(
		`?typeproduct=${section === Section.Disks ? 3 : 1}`,
	);
	const paramsUrl = transformUrl({ section, slug });
	const found = slug?.find(item => item.startsWith('order-'))?.split('-')[1] as keyof typeof sort;
	const searchParams = `?${paramsUrl || ''}${found && sort[found] ? sort[found] : ''}`;
	const products = await getProducts(searchParams, page ? (page - 1) * pageItem : 0, 12);

	return (
		<Layout>
			<HeaderCatalog section={ section } slug={ slug } />
			<div className='py-5 lg:flex lg:gap-10'>
				<FilterAlt filterData={ filterData } section={ section } />
				<div className='flex-1 -mt-8 lg:-mt-12'>
					<FilterByCar />
					<SelectionByCar />
					<FilterActive locale={ locale } className='hidden lg:flex' slug={ slug } />
					{ products.result ? <ProductList
						locale={ locale }
						classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
						data={ products.data }
					/> : <NoResult noResultText='no result' /> }
					{ products.result && products.data.total_count > pageItem && <div className='mt-10 flex justify-center'>
						<Pagination initialPage={ page || 1 } total={ Math.floor(products.data.total_count/pageItem) } />
					</div> }
				</div>
			</div>
		</Layout>
	)
};
