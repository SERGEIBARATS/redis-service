const RedisService = require('./redis.service');

const redisService = new RedisService();

const run = async () => {
	try {
		let value;
		// Store a string in Redis
		const isSet = await redisService.set('software engineer', 'sergei barats');
		value = await redisService.get('software engineer');
		console.log(value);
		await redisService.remove('software engineer');
		await redisService.setWithTTL('software engineer', 'sergei barats',30);

		// Store objects in Redis
		const isHmset = await redisService.hmset('programmer', { name: 'sergei barats', company: 'round trip' });
		value = await redisService.hgetall('programmer', { name: 'sergei barats', company: 'round trip' });
		console.log(value);
		await redisService.remove('programmer');

		//Store objects in Redis
		const isRpush = await redisService.rpush(['programmers', 'orel', 'daniel', 'sergei']);
		value = await redisService.lrange('programmers');
		console.log(value);
		await redisService.remove('programmers');

		await redisService.end(true);
	} catch (error) {
		console.error('error :>> ', error);
	}
};

run();
