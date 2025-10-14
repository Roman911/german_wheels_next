import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '../../components/Layout/Header';
import Footer from '@/components/Footer';
import '../colors.css';
import '../globals.css';
import { Language } from '@/models/language';

const gilroy = localFont({
	src: [
		{
			path: '../../public/fonts/Gilroy-Regular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-SemiBold.woff',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-Bold.woff',
			weight: '700',
			style: 'normal',
		},
	],
})

async function getSettings() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function RootLayout(
	{
		children,
		params,
	}: Readonly<{
		children: React.ReactNode;
		params: Promise<{ locale: Language }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();

	return (
		<html lang={ locale }>
		<body className={ gilroy.className }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header locale={ locale } settings={ response } />
				<main>
					{ children }
				</main>
				<Footer locale={ locale } settings={ response } />
			</NextIntlClientProvider>
		</StoreProvider>
		</body>
		</html>
	);
};
