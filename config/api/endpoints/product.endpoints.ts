import { API_CONSTANTS } from '../constants';
const { API } = API_CONSTANTS.ENDPOINTS;

export const productEndpoints = {
	products: (id: string) => `${API}/getProducts${id}`,
	productsPaired: (id: string) => `${API}/getProductsPaired${id}`,
	product: (section: string) => `${API}/getProduct/${section}`,
	dataAkum: `${API}/baseDataAkum`,
	reviews: `${API}/addReview`
} as const;
