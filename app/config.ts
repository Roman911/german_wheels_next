import { Config } from '../models/config';

export const config: Config = {
	domain: 'imperiya-shin.ua',
	startYear: 2008,
	social: {
		links: [
			{ link: 'https://t.me', logo: 'telegram' },
			{ link: 'https://www.facebook.com', logo: 'facebook' },
			{ link: 'https://www.viber.com', logo: 'viber' },
		],
	},
	catalog: {
		itemsProduct: 12
	},
	filterAlt: {
		submitFloatShowTime: 7000
	},
	deliveryCalculation: {
		postpaid: {
			const: 20,
			cof: 1.02
		}
	}
}
