import type { Metadata } from 'next';
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../colors.css';
import '../globals.css';

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

export const metadata: Metadata = {
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			url: '/favicon-48x48.png',
			sizes: '48x48',
		},
		{
			rel: 'icon',
			type: 'image/svg+xml',
			url: '/favicon.svg',
		},
		{
			rel: 'shortcut icon',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/apple-touch-icon.png'
		},
		{
			rel: 'manifest',
			url: '/site.webmanifest',
		}
	]
};

async function getSettings() {
	const res = await fetch('https://admin.g-wheels.com.ua/baseData/settings', {
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
		params: Promise<{ locale: string }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();

	return (
		<html lang={ locale }>
		<head>
			<title>{ response[locale].shablon_title }</title>
			<meta name="description" content={ response[locale].shablon_title } />
		</head>
		<body className={ gilroy.className }>

		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header locale={ locale } settings={ response } />
				{ children }
				<Footer locale={ locale } settings={ response } />
			</NextIntlClientProvider>
		</StoreProvider>
		</body>
		</html>
	);
};
