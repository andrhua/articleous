import { hgetallAsync, hsetAsync, delAsync } from './db.js';
import { deleteStats } from './stat.js';


export async function getUser(id) {
	return hgetallAsync(`user:${id}`);
}

export async function addUser(profile) {
	const { id, username, photos } = profile;
	await hsetAsync(`user:${id}`, 
			'id', id,
			'username', username,
			'avatar', photos[0].value);
	return await getUser(id);
}

export async function deleteUser(id) {
	await delAsync(`user:${id}`);
	await deleteStats(id);
}
	
