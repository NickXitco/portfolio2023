import { combineReducers } from 'redux'
import { hoveredLinkSlice } from './HoveredLink'
import { currentSectionSlice } from './CurrentSection'
import { lowFPSSlice } from './LowFPS'

const rootReducer = combineReducers({
	hoveredLink: hoveredLinkSlice.reducer,
	currentSection: currentSectionSlice.reducer,
	lowFPS: lowFPSSlice.reducer,
})

export default rootReducer
