import { getAnswer, getFeedback } from '../../server/exercise-oracle.js';
import { updateAnswerCounters } from '../../server/stat.js';


export async function post(req, res, next) {
	const { id, userAnswers } = req.body;
	const truth = await getAnswer(id);
	//updateAnswerCounters(req.user.id, truth, userAnswers);
	updateAnswerCounters(0, truth, userAnswers);
	const feedback = getFeedback(truth, userAnswers);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(feedback));
}
