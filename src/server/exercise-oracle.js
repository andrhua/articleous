import { hgetAsync } from './db.js';
export const PRACTICE_LENGTH = 1;


async function getText(id) {
	return hgetAsync(`sentences:${id}`, "text");
}

export async function getAnswer(id) {
	return hgetAsync(`sentences:${id}`, "answer").then(v => v.split(' '));
}

export async function formPractice(id) {
	let res = [];
	for (let i = 0; i < PRACTICE_LENGTH; i++) {
		const id = Math.floor(Math.random() * 1000) 
		res.push([id, await getText(id)]);
	}
	return Promise.all(res);
}

export function getFeedback(truth, userAnswers) {
	return Array.from(userAnswers.entries(), ([i, v]) => v === truth[i]);
}

