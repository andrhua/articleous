import { getText } from '../../utils/db.js';


export async function get(req, res, next) {
	const { id } = req.params;
	const text = await getText(id);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(text));
}
