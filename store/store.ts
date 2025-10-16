import { combineReducers, configureStore } from '@reduxjs/toolkit';

import bookmarksReducer from './slices/bookmarksSlice';
import cartReducer from './slices/cartSlice';
import comparisonReducer from './slices/comparisonSlice';
import filterCarReducer from './slices/filterCarSlice';
import filterReducer from './slices/filterSlice';
import orderReducer from './slices/orderSlice';
import phoneReducer from './slices/phoneSlice';
import settingsReducer from './slices/settingsSlice';
import searchReducer from './slices/searchSlice';
import tireServiceReducer from './slices/tireService';
import { baseDataAPI } from '@/services/baseDataService';

const rootReducer = combineReducers({
	bookmarksReducer,
	cartReducer,
	comparisonReducer,
	filterCarReducer,
	filterReducer,
	orderReducer,
	phoneReducer,
	settingsReducer,
	searchReducer,
	tireServiceReducer,
	[baseDataAPI.reducerPath]: baseDataAPI.reducer
})

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseDataAPI.middleware)
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
