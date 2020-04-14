import { exists, getAnswerCounters, getRecords, types } from '../../server/stat.js';


export async function get(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	const { id } = req.user;
	if (await exists(id)) {
		const correct = await getAnswerCounters(id, 'correct');
		const wrong = await getAnswerCounters(id, 'wrong');
		const record = await getRecords(id);
		res.end(JSON.stringify({ correct, wrong, record, types }));
	} else {
		res.end(JSON.stringify(null));
	}
}
