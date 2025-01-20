import { FC } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { JSDOM } from "jsdom";

interface Props {
	description: string;
}

const TextSeo: FC<Props> = ({ description })=> {
	console.log(description)
	
	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify((new JSDOM("<!DOCTYPE html>")).window).sanitize(htmlString);
		return (
			<div
				className="container mx-auto max-w-7xl mt-20 mb-24 px-2"
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return <HtmlContent htmlString={ description } />
}

export default TextSeo;
