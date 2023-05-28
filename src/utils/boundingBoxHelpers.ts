export const getElementOffsetRelativeToRoot = (element: HTMLElement) => {
	const elementRect = element.getBoundingClientRect()
	const rootRect = document.body.getBoundingClientRect()
	return elementRect.top - rootRect.top
}
export const getElementTopAndBottomRelativeToRoot = (element: HTMLElement) => {
	const elementRect = element.getBoundingClientRect()
	const rootRect = document.body.getBoundingClientRect()
	return {
		top: elementRect.top - rootRect.top,
		bottom: elementRect.bottom - rootRect.top,
	}
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

/**
 * Determines if an element is above, below, or inside the viewport
 * @param {HTMLElement} element - The element to check its position in the viewport
 */
export const getElementPositionInViewport = (element: HTMLElement) => {
	const windowHeight = window.innerHeight
	const elementRect = element.getBoundingClientRect()
	const elementTop = elementRect.top
	const elementBottom = elementRect.bottom

	if (elementBottom <= 0) {
		return 'above'
	} else if (elementTop >= windowHeight) {
		return 'below'
	} else {
		return 'inside'
	}
}

/**
 * Smooth scrolls to an element with a specified offset
 * @param {HTMLElement} element - The element to scroll to
 * @param {number} [offset=0] - The offset in pixels to apply when scrolling (positive values scroll up, negative values scroll down)
 */
export const smoothScrollToElement = (element: HTMLElement, offset = 0) => {
	const elementPosition = getElementOffsetRelativeToRoot(element) - offset

	window.scrollTo({
		top: elementPosition,
		behavior: 'smooth',
	})
}
