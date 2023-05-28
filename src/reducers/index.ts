import { combineReducers } from 'redux'
import { hoveredLinkSlice } from './HoveredLink'
import { currentSectionSlice } from './CurrentSection'

const rootReducer = combineReducers({
	hoveredLink: hoveredLinkSlice.reducer,
	currentSection: currentSectionSlice.reducer,
})

export default rootReducer
