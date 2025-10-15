import { API_CONSTANTS } from '../constants';
const { TYRE_SERVICE } = API_CONSTANTS.ENDPOINTS;

export const tyreServiceEndpoints = {
	locations: `${TYRE_SERVICE}/locations`,
} as const;