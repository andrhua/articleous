import { getText } from '../../utils/db.js';
export const TRAINING_LENGTH = 6;


export async function startSession(uid) {
	const exercises = formTrainingSession(uid);
	const promises = [];
	for (let id of exercises) {
		promises.push(getText(id));
	}
	return Promise.all(promises);
}

function formTrainingSession(uid) {
	let res = [];
	for (let i = 0; i < TRAINING_LENGTH; i++) {
		res.push(Math.floor(Math.random() * 1000));
	}
	return res;
}

export async function get(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	switch(req.query.q) {
		case 'length': 
			res.end(JSON.stringify(TRAINING_LENGTH));
			break;
		default: next(); 
	} 
	
}

export async function post(req, res, next) {
	const { uid } = req.body;
	const exercises = await startSession(uid);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(exercises));
}

