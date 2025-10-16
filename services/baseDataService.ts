import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	API_CONSTANTS,
	DEFAULT_HEADERS,
	FORM_HEADERS,
	baseEndpoints,
	orderEndpoints,
	formEndpoints,
	tyreServiceEndpoints
} from '@/config/api';
import type { BaseDataProps, CarModelProps, KitDiskSize, KitTyreSize, ManufModels } from '@/models/baseData';
import type { SettingsProps } from '@/models/settings';
import type { ProductsProps } from '@/models/products';
import type { OrdersParamProps } from '@/models/ordersParam';
import type { AliasAll } from '@/models/alias';
import { TimeSlots } from '@/models/tireService';

export const baseDataAPI = createApi({
	reducerPath: 'dataAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: API_CONSTANTS.BASE_URL,
		headers: DEFAULT_HEADERS,
	}),
	tagTypes: ['baseDataAPI', 'Product'],
	endpoints: (build) => ({
		fetchSettings: build.query<SettingsProps, string>({
			query: () => ({
				url: baseEndpoints.settings,
			}),
		}),
		fetchBaseData: build.query<BaseDataProps, string>({
			query: () => ({
				url: baseEndpoints.baseData,
			}),
		}),
		fildterData: build.query<BaseDataProps, string>({
			query: (id) => ({
				url: `/api/FildterData${id}`,
			}),
		}),
		fetchAutoModel: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: baseEndpoints.autoBrandModel(id),
			}),
		}),
		fetchAutoYear: build.query<number[], string>({
			query: (id) => ({
				url: baseEndpoints.autoBrandModelYear(id),
			}),
		}),
		fetchAutoModelKit: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: baseEndpoints.autoBrandModelKit(id),
			}),
		}),
		fetchKitTyreSize: build.query<KitTyreSize[], string>({
			query: (id) => ({
				url: baseEndpoints.kitTyreSize(id),
			}),
		}),
		fetchKitDiskSize: build.query<KitDiskSize[], string>({
			query: ([section]) => ({
				url: `/baseData/getKitDiskSize/${[section]}`,
			}),
		}),
		fetchManufModels: build.query<ManufModels[], string>({
			query: ([section]) => ({
				url: `/api/getManufModels/${[section]}`,
			}),
		}),
		fetchStatiAliasAll: build.query<AliasAll, string>({
			query: () => ({
				url: `/baseData/StatiAlias`,
			}),
		}),
		fetchStatiAlias: build.query({
			query: (id) => ({
				url: `/baseData/StatiAlias/${id}`,
			}),
		}),
		fetchProducts: build.query<ProductsProps | undefined, {id: string, start?: number, length?: number}>({
			query: ({ id, start = 0, length = 10 }) => ({
				url: `/api/getProducts${id}`,
				method: 'POST',
				body: {
					start,
					length
				}
			}),
		}),
		createComment: build.mutation({
			query: (comment) => ({
				url: '/api/addReview',
				method: 'POST',
				body: comment,
			}),
			invalidatesTags: ['Product'],
		}),
		fetchOrdersParam: build.query<OrdersParamProps, string>({
			query: () => ({
				url: `/api/getOrdersParam`,
			}),
		}),
		fetchNpSearch: build.query({
			query: (name) => ({
				url: `/api/np/search`,
				method: 'POST',
				body: {
					name: name
				}
			}),
		}),
		fetchNpWarehouses: build.query({
			query: (ref) => ({
				url: `/api/np/warehouses/${ref}`,
			}),
		}),
		fetchNpDocumentPrice: build.query({
			query: (params) => ({
				url: `/api/np/getDocumentPrice`,
				method: 'POST',
				body: params,
			}),
		}),
		fetchSlotsQuery: build.query<TimeSlots, string>({
			query: (id) => ({
				url: tyreServiceEndpoints.slots(id),
			}),
		}),
		createOrder: build.mutation({
			query: (data) => ({
				url: orderEndpoints.create,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(data),
				headers: FORM_HEADERS
			}),
		}),
		createCallback: build.mutation({
			query: (data) => ({
				url: formEndpoints.callback,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(data),
				headers: FORM_HEADERS
			}),
		}),
		createAddAsk: build.mutation({
			query: (data) => ({
				url: formEndpoints.ask,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(data),
				headers: FORM_HEADERS
			}),
		}),
		createTyreService: build.mutation({
			query: (data) => ({
				url: tyreServiceEndpoints.book,
				method: API_CONSTANTS.METHODS.POST,
				body: JSON.stringify(data),
				headers: FORM_HEADERS
			}),
		}),
	}),
});
