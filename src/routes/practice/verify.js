import { getAnswer, getFeedback, PRACTICE_LENGTH } from '../../server/exercise-oracle.js';
import { updateAnswerCounters, updateRecords } from '../../server/stat.js';


export async function post(req, res, next) {
	const { exerciseId, userAnswers } = req.body; 
	const userId = req.user.id;
	const truth = await getAnswer(exerciseId);
	const feedback = getFeedback(truth, userAnswers);
	await updateAnswerCounters(userId, truth, userAnswers);
	req.session.completedExercises++;
	if (req.session.completedExercises === PRACTICE_LENGTH) {
		await updateRecords(userId);
	}
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(feedback));
}
