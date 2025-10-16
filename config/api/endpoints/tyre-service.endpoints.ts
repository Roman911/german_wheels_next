import { API_CONSTANTS } from '../constants';
const { TYRE_SERVICE } = API_CONSTANTS.ENDPOINTS;

export const tyreServiceEndpoints = {
	locations: `${TYRE_SERVICE}/locations`,
	slots: (id: string) => `${TYRE_SERVICE}/slots${id}`,
	book: `${TYRE_SERVICE}/book`
} as const;