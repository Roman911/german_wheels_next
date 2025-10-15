import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';
import Title from '@/components/Lib/Title';
import { getLocalesService } from '@/app/api/api';
import TireServiceLayout from '@/components/TireService';
import Tabs from '@/components/TireService/Tabs';

export default async function TireService() {
	const locations = await getLocalesService();

	const path = [
		{
			title: 'tire service',
			href: '/',
			translations: true
		},
	];

	return (
		<Layout>
			<div className='max-w-5xl mx-auto'>
				<Breadcrumbs path={ path }/>
				<Title title='sign up for tire fitting' translations={ true }/>
				<Tabs />
				<TireServiceLayout locations={ locations } />
			</div>
		</Layout>
	)
};
