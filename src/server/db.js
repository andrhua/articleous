const { promisify } = require('util');
const redis = require('redis');


export let client;
if (process.env.REDISTOGO_URL) {
	let rtg = require("url").parse(process.env.REDISTOGO_URL);
	client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
} else {
	client = redis.createClient();
}

client.on('error', function(error) {
	console.error(error);
});


function wrap(meth) {
	return promisify(client[meth]).bind(client);
}

export const existsAsync = wrap('exists');
export const delAsync = wrap('del');

export const hgetAsync = wrap('hget');
export const hsetAsync = wrap('hmset');
export const hgetallAsync = wrap('hgetall');
export const hincrbyAsync = wrap('hincrby');

export const lrangeAsync = wrap('lrange');
export const rpushAsync = wrap('rpush');
