import { RecipesService } from '../lib/recipes.service';
import { AuthCheck } from '../lib/auth.check';
import { client, headers } from '../lib/config.js';

const service = new RecipesService({ client });
const auth = new AuthCheck();

exports.handler = async (event, context) => {
	console.log('Function `recipes` invoked')

	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 200,
			headers,
			body: 'This was a preflight call!'
		}
	};

	if (event.httpMethod !== 'GET') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	};

	try {
		
		const token = await auth.verify(event);

		const recipes = await service.getRecipes();

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(recipes),
		}

	} catch (error) {
		console.log('error', error)

		return {
			statusCode: 400,
			headers,
			body: JSON.stringify(error),
		}
	}
}