const { promisify } = require('util');
const redis = require('redis');
export const client = redis.createClient();
client.on('error', function(error) {
	console.error(error);
});

function wrap(meth) {
	return promisify(client[meth]).bind(client);
}

export const hgetAsync = wrap('hget');
export const hsetAsync = wrap('hset');
export const hgetallAsync = wrap('hgetall');
export const hincrbyAsync = wrap('hincrby');

export const lrangeAsync = wrap('lrange');
export const rpushAsync = wrap('rpush');
