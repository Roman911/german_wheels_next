import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FormFields {
	name: string;
	email: string;
	auto: string;
	model: string;
	num: string;
	comment: string;
}

export interface TireServiceState {
	location: number
	selectedKey: string
	typeCar: string | null
	diameter: string | null
	tyreSource: string | null
	seasonChange: boolean
	wheelBalancing: boolean
	date: string | null
	time: string | null
	form: FormFields
}

const initialState: TireServiceState = {
	location: 1,
	selectedKey: 'location',
	typeCar: null,
	diameter: null,
	tyreSource: null,
	seasonChange: false,
	wheelBalancing: false,
	date: null,
	time: null,
	form: {
		name: '',
		email: '',
		auto: '',
		model: '',
		num: '',
		comment: '',
	},
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
		setDate: (state, actions: PayloadAction<string | null>) => {
			state.date = actions.payload
		},
		setTime: (state, actions: PayloadAction<string | null>) => {
			state.time = actions.payload
		},
		setChange: (state, actions: PayloadAction<{ name: 'name' | 'email' | 'auto' | 'model' | 'num' | 'comment'; value: string }>) => {
			state.form[actions.payload.name] = actions.payload.value;
		},
		reset: () => initialState,
	},
})

export const { setDate, setDiameter, setLocation, setSelectedKey, setTypeCar, setTyreSource, setSeasonChange, setWheelBalancing, setTime, setChange, reset } = tireServiceSlice.actions

export default tireServiceSlice.reducer
