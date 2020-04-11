import { hgetallAsync, hincrbyAsync, lrangeAsync, rpushAsync } from './db.js';


export const types = ['zero', 'indefinite', 'definite'];


function key(id, ...args) {
	return `stat:${id}:` + args.join(':');
}

export async function getAnswerCounters(id, answerType) {
	return hgetallAsync(key(id, answerType));
}

export async function updateAnswerCounters(id, truth, userAnswers) {
	function convert(articleIndex) {
		switch (articleIndex) {
			case '0': return types[0];
			case '3': return types[2];
			case '1': case '2':
				return types[1];
		}
		return 'nani';
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
	correct = await incrAnswerCounters(id, 'correct', correct);
	wrong = await incrAnswerCounters(id, 'wrong', wrong);
	await updateRecord(id, correct, wrong);
}

async function incrAnswerCounters(id, answerType, values) { 
	Object.keys(values).
		map(async article => values[article] = await hincrbyAsync(key(id, answerType), article, values[article]));
	return values;
}

export async function getRecords(id) {
	const res = {};
	for (const type of types) {
		res[type] = await lrangeAsync(key(id, 'record', type), 0, -1);
	}
	return res;
}

export async function updateRecord(id, correct, wrong) {
	function hitRatio(article) {
		return correct[article] / (correct[article] + wrong[article]);
	}

	return Promise.all(
		types.map(type => rpushAsync(key(id, 'record', type), hitRatio(type)))
	);
}

