import { Language } from '@/models/language';
import { IFilter, Section } from '@/models/filter';
import { parseUrl } from '../../../../../lib/seo';

const special = ['3','4','5','6','9','10','11'];

const initialFilterState: IFilter = {
	width: null,
	height: null,
	radius: null,
	sezon: null,
	brand: null,
	model_id: null,
	country: null,
	year: null,
	omolog: null,
	krepeg: null,
	typedisk: null,
	colir: null,
	jemnist: null,
	puskovii_strum: null,
	tip_elektrolitu: null,
	tip_korpusu: null,
	napruga: null,
	poliarnist: null,
	vehicle_type: null,
	li: null,
	si: null,
	only_studded: null,
	only_c: null,
	only_xl: null,
	only_owl: null,
	only_run_flat: null,
	only_off_road: null,
	minPrice: null,
	maxPrice: null,
	etMin: null,
	etMax: null,
	diaMin: null,
	diaMax: null,
	minShirina: null,
	maxShirina: null,
	minVisota: null,
	maxVisota: null,
	minDovzina: null,
	maxDovzina: null,
}

const paramKeys: Array<keyof IFilter> = [
	'width', 'height', 'radius', 'sezon', 'brand', 'model_id', 'country', 'year', 'omolog',
	'krepeg', 'typedisk', 'colir', 'jemnist', 'puskovii_strum', 'tip_elektrolitu',
	'tip_korpusu', 'napruga', 'poliarnist', 'vehicle_type', 'li', 'si', 'only_studded',
	'only_c', 'only_xl', 'only_owl', 'only_run_flat', 'only_off_road', 'minPrice', 'maxPrice',
	'etMin', 'etMax', 'diaMin', 'diaMax', 'minShirina', 'maxShirina', 'minVisota', 'maxVisota',
	'minDovzina', 'maxDovzina'
];

export const transformUrl = (
	{ section, slug }: { section: Section, slug: string[] }
) => {
	const filter = parseUrl(slug?.join('/') || '');
	const params: string[] = [];

	const updateParamsList = (key: string, value: string | null | undefined) => {
		if(value) params.push(`${key}=${value}`);
	};

	paramKeys.forEach(key => {
		updateParamsList(key, filter[key] ?? '');
	});

	const sectionTypeMap: Record<Section, string> = {
		[Section.Disks]: 'typeproduct=3&',
		[Section.Tires]: (filter.vehicle_type && special.includes(filter.vehicle_type)) ? 'typeproduct=2&' : '',
		[Section.Car]: '',
	};

	// console.log('transformUrl', slug, sectionTypeMap, params)

	return `${sectionTypeMap[section] || ''}${params.join('&')}`;
};
