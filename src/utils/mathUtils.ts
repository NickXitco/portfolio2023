export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const map = (n: number, start1: number, stop1: number, start2: number, stop2: number) => {
	const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
	if (start2 < stop2) {
		return clamp(newval, start2, stop2)
	} else {
		return clamp(newval, stop2, start2)
	}
}

export const clamp = (n: number, low: number, high: number) => Math.max(Math.min(n, high), low)

export const mod = (n: number, m: number) => ((n % m) + m) % m
