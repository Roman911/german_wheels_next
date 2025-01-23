import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

import { Language } from './models/language';

// Dynamically infer locales from the Language enum
const locales = Object.values(Language);

export default getRequestConfig(async () => {
	// Await headers to get the locale
	const locale = (await headers()).get('X-NEXT-INTL-LOCALE');
	if (!locale || !locales.includes(locale as Language)) {
		notFound();
	}

	// Import and return messages
	const messages = (await import(`./locales/${locale}.json`)).default;
	return { messages, locale };
});
