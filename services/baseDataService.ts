import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import type { BaseDataProps, CarModelProps, KitTyreSize, KitDiskSize, ManufModels } from '@/models/baseData';
import type { BaseDataProps } from '@/models/baseData';
import type { SettingsProps } from '@/models/settings';
import type { ProductsProps } from '@/models/products';
// import type { ProductProps } from '../models/product';
// import type { AkumProps } from '../models/akumData';
// import type { OrdersParamProps } from '../models/ordersParam';
// import type { Banner } from '../models/banners';
// import { FeatureParamsProps } from '../models/featureParams';
import type { AliasAll } from '@/models/alias';

export const baseDataAPI = createApi({
	reducerPath: 'dataAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://admin.g-wheels.com.ua',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Origin': 'http://localhost:3000/',
		},
	}),
	tagTypes: ['baseDataAPI', 'Product'],
	endpoints: (build) => ({
		fetchSettings: build.query<SettingsProps, string>({
			query: () => ({
				url: `/baseData/settings`,
			}),
		}),
		fetchBaseData: build.query<BaseDataProps, string>({
			query: () => ({
				url: '/baseData',
			}),
		}),
		// fildterData: build.query<BaseDataProps, string>({
		// 	query: ([section]) => ({
		// 		url: `/api/FildterData${[section]}`,
		// 	}),
		// }),
		// fetchAutoModel: build.query<CarModelProps[], string>({
		// 	query: ([section]) => ({
		// 		url: `/baseData/getAutoBrandModel/${[section]}`,
		// 	}),
		// }),
		// fetchAutoYear: build.query<number[], string>({
		// 	query: ([section]) => ({
		// 		url: `/baseData/getAutoBrandModelYear/${[section]}`,
		// 	}),
		// }),
		// fetchAutoModelKit: build.query<CarModelProps[], string>({
		// 	query: ([section]) => ({
		// 		url: `/baseData/getAutoBrandModelKit/${[section]}`,
		// 	}),
		// }),
		// fetchKitTyreSize: build.query<KitTyreSize[], string>({
		// 	query: ([section]) => ({
		// 		url: `/baseData/getKitTyreSize/${[section]}`,
		// 	}),
		// }),
		// fetchKitDiskSize: build.query<KitDiskSize[], string>({
		// 	query: ([section]) => ({
		// 		url: `/baseData/getKitDiskSize/${[section]}`,
		// 	}),
		// }),
		// fetchManufModels: build.query<ManufModels[], string>({
		// 	query: ([section]) => ({
		// 		url: `/api/getManufModels/${[section]}`,
		// 	}),
		// }),
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
		// fetchProduct: build.query<ProductProps, string>({
		// 	query: ([section]) => ({
		// 		url: `/api/getProduct/${[section]}`,
		// 	}),
		// 	providesTags: () => ['Product']
		// }),
		// fetchDataAkum: build.query<AkumProps, string>({
		// 	query: () => ({
		// 		url: `/api/baseDataAkum`,
		// 	}),
		// }),
		// fetchBrand: build.query({
		// 	query: ([section]) => ({
		// 		url: `/api/brand/${[section]}`,
		// 	}),
		// }),
		// fetchModel: build.query({
		// 	query: ([section]) => ({
		// 		url: `/api/model/${[section]}`,
		// 	}),
		// }),
		// fetchBrands: build.query({
		// 	query: (section) => ({
		// 		url: `/api/catalog-map/${section}`,
		// 	}),
		// }),
		// fetchBrandItems: build.query({
		// 	query: ({ section, [section] }) => ({
		// 		url: `/api/catalog-map/${section}/${[section]}`,
		// 	}),
		// }),
		// createComment: build.mutation({
		// 	query: (comment) => ({
		// 		url: '/api/addReview',
		// 		method: 'POST',
		// 		body: comment,
		// 	}),
		// 	invalidatesTags: ['Product'],
		// }),
		// fetchOrdersParam: build.query<OrdersParamProps, string>({
		// 	query: () => ({
		// 		url: `/api/getOrdersParam`,
		// 	}),
		// }),
		// fetchNpSearch: build.query({
		// 	query: (name) => ({
		// 		url: `/api/np/search`,
		// 		method: 'POST',
		// 		body: {
		// 			name: name
		// 		}
		// 	}),
		// }),
		// fetchNpWarehouses: build.query({
		// 	query: (ref) => ({
		// 		url: `/api/np/warehouses/${ref}`,
		// 	}),
		// }),
		// fetchBanners: build.query<Banner[], string>({
		// 	query: () => ({
		// 		url: `https://admin.luxshina.ua/api/banner`,
		// 	}),
		// }),
		// fetchFeatureParams: build.query<FeatureParamsProps, string>({
		// 	query: () => ({
		// 		url: `/api/getFeatureParams`,
		// 	}),
		// }),
		// fetchNpDocumentPrice: build.query({
		// 	query: (params) => ({
		// 		url: `/api/np/getDocumentPrice`,
		// 		method: 'POST',
		// 		body: params,
		// 	}),
		// }),
		// createOrder: build.mutation({
		// 	query: (data) => ({
		// 		url: '/api/addOrder',
		// 		method: 'POST',
		// 		body: data,
		// 		header: {
		// 			'Content-Type': 'application/x-www-form-urlencoded',
		// 			'Accept': 'application/json',
		// 		}
		// 	}),
		// }),
		// createCallback: build.mutation({
		// 	query: (data) => ({
		// 		url: '/api/addCallback',
		// 		method: 'POST',
		// 		body: data,
		// 		header: {
		// 			'Content-Type': 'application/x-www-form-urlencoded',
		// 			'Accept': 'application/json',
		// 		}
		// 	}),
		// }),
		// createAddAsk: build.mutation({
		// 	query: (data) => ({
		// 		url: '/api/addAsk',
		// 		method: 'POST',
		// 		body: data,
		// 		header: {
		// 			'Content-Type': 'application/x-www-form-urlencoded',
		// 			'Accept': 'application/json',
		// 		}
		// 	}),
		// }),
	}),
});
