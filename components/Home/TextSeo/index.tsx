'use client'
import { FC } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { baseDataAPI } from '@/services/baseDataService';
import { Language } from '@/models/language';

interface Props {
	locale: string;
}

const TextSeo: FC<Props> = ({ locale }) => {
	const { data } = baseDataAPI.useFetchSettingsQuery('');
	const lang = locale === Language.UA ? Language.UA : Language.RU;

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				className="container mx-auto max-w-7xl mt-20 mb-24 px-2"
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return <HtmlContent htmlString={ data?.[lang].description || '' } />
};

export default TextSeo;
