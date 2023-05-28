import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LinkType = 'developer' | 'performer' | 'home' | 'about me'

interface HoveredLinkState {
	value: LinkType
}

const initialState: HoveredLinkState = {
	value: 'home',
}

export const hoveredLinkSlice = createSlice({
	name: 'HoveredLink',
	initialState,
	reducers: {
		setHoveredLink: (state, action: PayloadAction<LinkType>) => {
			state.value = action.payload
		},
	},
})

// Export the action creators
export const { setHoveredLink } = hoveredLinkSlice.actions
