import { deleteUser } from '../server/user.js';


export async function get(req, res, next) {
	deleteUser(req.user.id);
	res.redirect('/logout');
}
