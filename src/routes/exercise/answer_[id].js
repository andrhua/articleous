import { fetch, getAnswer } from '../../utils/db.js';
import { server } from '../../server.js';


export async function get(req, res, next) {
	const { id } = req.params;
	const answer = await getAnswer(id);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(answer));
}

export async function post(req, res, next) {
	const { id } = req.params;
	const { studentAnswers } = req.body;
	const truth = await fetch(`${server}/exercise/answer_${id}`)
		.then(v => v.json())
		.then(v => v.split(' '));
	const result = Array(truth.length);
	for (let i = 0; i < result.length; i++) {
		result[i] = truth[i] === studentAnswers[i];
	}
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(result));
}
