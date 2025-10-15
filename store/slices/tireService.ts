import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TireServiceState {
	location: number
	selectedKey: string
	typeCar: string | null
	diameter: string | null
	tyreSource: string | null
	seasonChange: boolean
	wheelBalancing: boolean
}

const initialState: TireServiceState = {
	location: 1,
	selectedKey: 'location',
	typeCar: null,
	diameter: null,
	tyreSource: null,
	seasonChange: false,
	wheelBalancing: false,
}

export const tireServiceSlice = createSlice({
	name: 'tireService',
	initialState,
	reducers: {
		setLocation: (state, actions: PayloadAction<number>) => {
			state.location = actions.payload
		},
		setSelectedKey: (state, actions: PayloadAction<string>) => {
			state.selectedKey = actions.payload
		},
		setTypeCar: (state, actions: PayloadAction<string>) => {
			state.typeCar = actions.payload
		},
		setDiameter: (state, actions: PayloadAction<string>) => {
			state.diameter = actions.payload
		},
		setTyreSource: (state, actions: PayloadAction<string>) => {
			state.tyreSource = actions.payload
		},
		setSeasonChange: (state, actions: PayloadAction<boolean>) => {
			state.seasonChange = actions.payload
		},
		setWheelBalancing: (state, actions: PayloadAction<boolean>) => {
			state.wheelBalancing = actions.payload
		},
		reset: () => initialState,
	},
})

export const { setDiameter, setLocation, setSelectedKey, setTypeCar, setTyreSource, setSeasonChange, setWheelBalancing, reset } = tireServiceSlice.actions

export default tireServiceSlice.reducer
