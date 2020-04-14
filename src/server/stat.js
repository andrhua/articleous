import { existsAsync, hgetallAsync, hincrbyAsync, lrangeAsync, rpushAsync, delAsync } from './db.js';


export const types = ['zero', 'indefinite', 'definite'];


function key(id, ...args) {
	return `stat:${id}:` + args.join(':');
}

export async function exists(id) {
	return existsAsync(key(id, 'correct'));
}

export async function getAnswerCounters(id, answerType) {
	return hgetallAsync(key(id, answerType));
}

export async function updateAnswerCounters(id, truth, userAnswers) {
	function convert(articleIndex) {
		switch (articleIndex) {
			case 0: return types[0];
			case 1: case 2:	return types[1];
			case 3: return types[2];
		}
		throw `the hell is this: ${articleIndex}`;
	}

	let correct = {};
	let wrong = {};
	for (const type of types) {
		correct[type] = 0;
		wrong[type] = 0;
	}
	for (let i = 0; i < truth.length; i++) {
		const article = convert(truth[i]);
		if (truth[i] === userAnswers[i]) 
			correct[article]++; 
		else {
			wrong[article]++;
			wrong[convert(userAnswers[i])]++;
		}
	}
	await incrAnswerCounters(id, 'correct', correct);
	await incrAnswerCounters(id, 'wrong', wrong);
}

async function incrAnswerCounters(id, answerType, values) {
	return Promise.all(Object.keys(values).map(article => hincrbyAsync(key(id, answerType), article, values[article])));
}

export async function getRecords(id) {
	const res = {};
	for (const type of types) {
		res[type] = await lrangeAsync(key(id, 'record', type), 0, -1);
	}
	return res;
}

export async function updateRecords(id) {
	const correct = await getAnswerCounters(id, 'correct');
	const wrong = await getAnswerCounters(id, 'wrong');

	function hitRatio(article) {
		const a = Number(correct[article]);
		const b = Number(wrong[article]);
		return a / (a + b);
	}

	return Promise.all(
		types.map(type => rpushAsync(key(id, 'record', type), hitRatio(type)))
	);
}


export async function deleteStats(id) { 
	await Promise.all(['correct', 'wrong'].map(t => delAsync(key(id, t))));
	await Promise.all(types.map(t => delAsync(key(id, 'record', t))));
}
