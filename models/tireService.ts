type LanguageCode = 'ua' | 'ru';

interface LocationDescription {
	name: string;
	address: string;
	phone: string | null;
}

export interface Location {
	id: number;
	timezone: string;
	is_active: number;
	descriptions: Record<LanguageCode, LocationDescription>;
}

export type Locations = Location[];

export interface TimeSlot {
	available: number;
	is_full: boolean;
	time: string;
}

export type TimeSlots = TimeSlot[];
