import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PhoneState {
	phone: string;
}

const initialState: PhoneState = {
	phone: '',
}

export const phoneSlice = createSlice({
	name: 'phoneService',
	initialState,
	reducers: {
		setPhone: (state, actions: PayloadAction<string>) => {
			state.phone = actions.payload;
		},
		reset: () => initialState,
	},
})

export const { setPhone, reset } = phoneSlice.actions

export default phoneSlice.reducer
