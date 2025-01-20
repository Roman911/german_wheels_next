// import DOMPurify from 'isomorphic-dompurify';
// import { baseDataAPI } from '@/services/baseDataService';
// import { useLanguages } from '@/hooks/language';

async function getSettings() {
	const res = await fetch('https://admin.g-wheels.com.ua/baseData/settings', { method: 'GET' });
	return await res.json();
}

export async function TextSeo() {
	const response = await getSettings();

	console.log(response);

	return <div>
		TextSeo
	</div>

	// const HtmlContent = ({ htmlString }: { htmlString: string }) => {
	// 	const sanitizedHtml = DOMPurify.sanitize(htmlString);
	// 	return (
	// 		<div
	// 			className="container mx-auto max-w-7xl mt-20 mb-24 px-2"
	// 			dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
	// 		/>
	// 	);
	// };
	//
	// return <HtmlContent htmlString={ data?.[lang].description || '' } />
}
