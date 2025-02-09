import { FC } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface Props {
	description: string;
}

const TextSeo: FC<Props> = ({ description })=> {
	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				className="container mt-20 mb-24 md:py-16 md:px-24 md:bg-white"
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return <HtmlContent htmlString={ description } />
}

export default TextSeo;
