import { ProductService } from '../lib/product.service.js'
import { client, headers } from '../lib/config.js'
import jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';

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
		audience: 'http://localhost:9000/.netlify/function',
	};


	const client = jwks({
		strictSsl: true, // Default value
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
		requestHeaders: {}, // Optional
		requestAgentOptions: {}, // Optional
		timeout: 3000, // Defaults to 30s
	});

	function getKey(header, callback) {
		client.getSigningKey(header.kid, function (err, key) {
			let signingKey = key.publicKey || key.rsaPublicKey;
			callback(null, signingKey);
		});
	}

	const authHeader = event.headers.authorization;
	console.log(`jwt: ${event.headers.authorization}`);

	const parts = authHeader.split(" ");
	if (parts.length !== 2 || parts[0] !== "Bearer") {
		// No access token was passed
		return null;
	}
	const accessToken = parts[1];

	console.log(`token: ${accessToken}`);

	// This could fail.  If it does handle as 401 as the token is invalid.
	var decodedToken = jwt.decode(accessToken, { complete: true });
	console.log(`decoded token: ${decodedToken.header.kid}`);

	const header = decodedToken.header;
	const decoded = jwt.verify(accessToken, getKey, { audience: authConfig.audience }, function (err, decoded) {

		if (err) {
			console.log(`err: ${err}`);
			
			// return {
			// 	statusCode: 401,
			// 	headers,
			// 	body: 'Unauthorized',
			// }
		}
		console.log(`verified: ${decoded}`);
	});


	// const products = await service.getProducts()
	// return {
	// 	statusCode: 200,
	// 	headers,
	// 	body: JSON.stringify(products),
	// }

	// } catch (error) {
	// 	console.log('error', error)

	// 	return {
	// 		statusCode: 400,
	// 		headers,
	// 		body: JSON.stringify(error),
	// 	}
	// }


}