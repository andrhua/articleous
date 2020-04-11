import { formPractice } from '../../server/exercise-oracle.js';


export async function get(req, res, next) {
	const { id } = req.query;
	const exercises = await formPractice(id);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(exercises));	
}
