import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';
import { Language } from '@/models/language';


export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: string, slug: string }> }) {
	const { locale, section, slug } = await params;

	console.log( locale, section, slug );

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
			123
		</Layout>
	)
};
