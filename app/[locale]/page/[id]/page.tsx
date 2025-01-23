import type { Metadata } from 'next'
import DOMPurify from 'isomorphic-dompurify';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Lib/Breadcrumbs';
import Title from '@/components/Lib/Title';
import type { Pages } from '@/models/alias';
import { Language } from '@/models/language';

async function getAlias(id: string): Promise<Pages> {
	const res = await fetch(`https://admin.g-wheels.com.ua/baseData/StatiAlias/${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language, id: string }> }): Promise<Metadata> {
	const { locale, id } = await params;
	const alias = await fetch(`https://admin.g-wheels.com.ua/baseData/StatiAlias/${id}`)
		.then((res) => res.json());

	return {
		title: alias[id].description[locale].meta_title,
		description: alias[id].description[locale].meta_description,
	}
}

export default async function Pages({ params }: { params: Promise<{ locale: Language, id: string }> }) {
	const { locale, id } = await params;
	const alias = await getAlias(id);

	const path = [
		{
			id: 1,
			title: alias[id].description[locale].title,
			translations: false,
			url: '/'
		}
	];

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: ['iframe'],
			ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy']
		});
		return (
			<div
				className="container mx-auto max-w-7xl mt-20 mb-24 px-2"
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return (
		<Layout>
			<Breadcrumbs path={ path } />
			<Title title={ alias[id].description[locale].meta_h1 && '' } />
			<HtmlContent htmlString={ alias[id].description?.[locale].content && '' } />
		</Layout>
	)
};
