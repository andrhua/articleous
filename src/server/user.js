import { hgetallAsync, hsetAsync } from './db.js';


export async function getUser(id) {
	return Object.assign({'id': id}, await hgetallAsync(`user:${id}`));
}

export async function addUser(profile) {
	const { id, username, photos } = profile;
	return await hsetAsync(`user:${id}`, 
			'username', username,
			'avatar', photos[0].value);
}

