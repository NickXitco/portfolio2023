import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Section = 'home' | 'about' | 'developer' | 'performer' | 'workwithme'

interface CurrentSectionState {
	value: Section
}

const initialState: CurrentSectionState = {
	value: 'home',
}

export const currentSectionSlice = createSlice({
	name: 'CurrentSection',
	initialState,
	reducers: {
		setCurrentSection: (state, action: PayloadAction<Section>) => {
			state.value = action.payload
		},
	},
})

// Export the action creators
export const { setCurrentSection } = currentSectionSlice.actions
