export const fetch = require('node-fetch');
const { promisify } = require('util');
const redis = require('redis');
export const client = redis.createClient();
client.on('error', function(error) {
	console.error(error);
});

export const hgetAsync = promisify(client.hget).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);

export async function getText(id) {
	return [id, await hgetAsync(`sentences:${id}`, "text")];
}

export async function getAnswer(id) {
	
	return await hgetAsync(`sentences:${id}`, "answer");
}

export async function getUser(id) {
	return await hgetallAsync(`user:${id}`);
}

export async function addUser(profile) {
	const { id, username, photos } = profile;
	const user = `user:${id}`;
	return Promise.all([
		hsetAsync(user, 'username', username),
		hsetAsync(user, 'avatar', photos[0].value)
	]);
}

