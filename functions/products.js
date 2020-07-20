import { ProductService } from '../lib/product.service.js'
import { client, headers } from '../lib/config.js'
import jwt from 'jsonwebtoken';
import { jwks } from 'jwks-rsa';

const service = new ProductService({ client })

exports.handler = async (event, context) => {
	console.log('Function `products` invoked')
	console.log(context);

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

	// Set up Auth0 configuration
	const authConfig = {
		domain: 'dev-1ri5oc4g.us.auth0.com',
		audience: 'http://localhost:9000/.netlify/products',
	};

	
	// const jwtCheck = jwt({
	// 	secret: jwks.expressJwtSecret({
	// 		cache: true,
	// 		rateLimit: true,
	// 		jwksRequestsPerMinute: 5,
	// 		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
	// 	}),
	// 	audience: authConfig.audience,
	// 	issuer: `https://${authConfig.domain}/`,
	// 	algorithms: ['RS256'],
	// });



	try {

        // const client = jwks({
		// 	jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
		// });

		const authHeader = event.headers.authorization;
		console.log(`jwt: ${event.headers.authorization}`);

		const parts = authHeader.split(" ");
		if (parts.length !== 2 || parts[0] !== "Bearer") {
			// No access token was passed
			return null;
		}
		const accessToken = parts[1];

		console.log(`token: ${accessToken}`);

		const secrest = 'L7OMeQjhZYy2lXXu0OJWZgvw3JwnTleVoiN03qPhB0WMY2zDN7wDwkq5sgagTdCX'
		const decoded = jwt.verify(accessToken, secrest);
		console.log(decode);
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