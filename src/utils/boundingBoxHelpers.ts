export const getElementOffsetRelativeToRoot = (element: HTMLElement) => {
	const elementRect = element.getBoundingClientRect()
	const rootRect = document.body.getBoundingClientRect()
	return elementRect.top - rootRect.top
}

/**
 * Returns the amount of the element height that is visible in the viewport
 * @param element
 * @return {number} number of pixels of element's height in the viewport
 */
export const getVisibleAmount = (element: HTMLElement) => {
	const windowHeight = window.innerHeight
	const elementTop = element.getBoundingClientRect().top
	const elementHeight = element.offsetHeight
	return Math.max(0, Math.min(windowHeight, elementTop + elementHeight) - Math.max(elementTop, 0)) // height in viewport
}
