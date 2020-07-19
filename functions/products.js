import { ProductService } from '../lib/product.service.js'
import { client, headers } from '../lib/config.js'

const service = new ProductService({ client })

exports.handler = async (event, context) => {
	console.log('Function `products` invoked')
    console.log(context);
	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 200,
			headers,
			body:'This was a preflight call!'
		}
	};

	if (event.httpMethod !== 'GET') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	};

	try {
		
		const products = await service.getProducts()
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(products),
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