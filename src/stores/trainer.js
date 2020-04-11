import { writable, readable } from 'svelte/store';

export const answer = writable();
export const exerciseId = writable(-1);
export const State = readable({'edit': 0, 'review': 1, 'finish': 2});
export const filled = writable(false);

function createFocusId() {
	const { subscribe, set, update } = writable(0);
	let max;
	return {
		subscribe,
		reset: (m) => {max = m; set(0);},
		set: (v => set(Math.max(0, Math.min(v, max))))
	}
}
export const focusId = createFocusId();
