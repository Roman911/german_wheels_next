import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';
import Title from '@/components/Lib/Title';
import TyreDiskSizeCalcComponent from '@/components/TyreDiskSizeCalc';

export default async function TyreDiskSizeCalc({ params }: { params: Promise<{ locale: string }> }) {
	const locale = (await params).locale;

	const path = [
		{
			title: 'tire calculator',
			translations: true,
			href: '/tyre-disk-size-calc'
		}
	];

	return (
		<Layout>
			<Breadcrumbs path={ path } />
			<Title title='tire calculator' translations={ true } />
			<TyreDiskSizeCalcComponent locale={ locale } />
		</Layout>
	)
};
