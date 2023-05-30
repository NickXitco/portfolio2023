import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LowFPSState {
	value: boolean
}

const initialState: LowFPSState = {
	value: false,
}

export const lowFPSSlice = createSlice({
	name: 'LowFPS',
	initialState,
	reducers: {
		setLowFPS: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload
		},
	},
})

// Export the action creators
export const { setLowFPS } = lowFPSSlice.actions
