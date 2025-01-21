export default async function Pages({ params }: { params: Promise<{ locale: string, id: string }> }) {
	const locale = (await params).locale;
	const id = (await params).id;

	console.log(locale, id);

	return (
		<div>Pages</div>
	)
};
