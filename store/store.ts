import { combineReducers, configureStore } from '@reduxjs/toolkit';

// import bookmarksReducer from './reducers/bookmarksSlice';
// import cartReducer from './reducers/cartSlice';
// import comparisonReducer from './reducers/comparisonSlice';
// import filterCarReducer from './reducers/filterCarSlice';
import filterReducer from './reducers/filterSlice';
// import langReducer from './reducers/langSlice';
// import orderReducer from './reducers/orderSlice';
import settingsReducer from './slices/settingsSlice';
// import searchReducer from './reducers/searchSlice';
// import brandAliasReducer from './reducers/brandAliasSlice';
//
import { baseDataAPI } from '@/services/baseDataService';

const rootReducer = combineReducers({
	// bookmarksReducer,
	// cartReducer,
	// comparisonReducer,
	// filterCarReducer,
	filterReducer,
	// langReducer,
	// orderReducer,
	settingsReducer,
	// searchReducer,
	// brandAliasReducer,
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
