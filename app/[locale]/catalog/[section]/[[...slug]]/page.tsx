import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';
import { Language } from '@/models/language';
import Title from '@/components/Lib/Title';
import FilterAlt from '@/components/Catalog/FilterAlt';
import { Section } from '@/models/filter';
import { BaseDataProps } from '@/models/baseData';

async function getFilterData(id: string): Promise<BaseDataProps> {
	const res = await fetch(`https://admin.g-wheels.com.ua/api/FildterData/${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: string, slug: string }> }) {
	const { locale, section, slug } = await params;
	const filterData = await getFilterData(`?typeproduct=${section === Section.Tires ? 1 : 3}`);

	console.log(filterData);

	console.log( locale, section, slug, section === Section.Tires ? 1 : 3 );

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
			<div className='py-5 lg:flex'>
				<FilterAlt filterData={ filterData } />
				<div>
					<div>123</div>
					<div>123dsa</div>
				</div>
			</div>
		</Layout>
	)
};
