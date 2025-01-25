import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	sassOptions: {
		additionalData: `$var: red;`,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'opt.tyreclub.com.ua',
				pathname: '/api/public/img/user/**',
			},
		],
	},
};

export default withNextIntl(nextConfig);
