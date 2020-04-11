import { getAnswerCounters, getRecords, types } from '../../server/stat.js';


export async function get(req, res, next) {
	// const { id } = req.user;
	const id = 0;
	const correct = await getAnswerCounters(id, 'correct');
	const wrong = await getAnswerCounters(id, 'wrong');
	const record = await getRecords(id);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ correct, wrong, record, types }));
}
