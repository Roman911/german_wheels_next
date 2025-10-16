import { ReactNode } from 'react';
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { getAliasAll, getSettings } from '@/app/api/api';
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

export default async function RootLayout({ children, params }: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params; // ✅ Тепер await доречний
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAliasAll();

	return (
		<html lang={ locale } suppressHydrationWarning>
		<head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
			/>
		</head>
		<body className={ gilroy.className }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header settings={ response } />
				<main>{ children }</main>
				<Footer settings={ response } alias={ alias }/>
			</NextIntlClientProvider>
		</StoreProvider>
		</body>
		</html>
	);
};
