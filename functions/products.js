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

		const client = jwks({
			strictSsl: true, // Default value
			jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
			requestHeaders: {}, // Optional
			requestAgentOptions: {}, // Optional
			timeout: 3000, // Defaults to 30s
		});

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
		 var decodedToken = jwt.decode(accessToken, {complete: true});
		 console.log(`decoded token: ${decodedToken.header.kid}`);
		 
		const kid = decodedToken.header.kid;
		let signingKey = null;

		client.getSigningKey(kid, (err, key) => {
			signingKey = key.getPublicKey();

			console.log(`Key: ${signingKey}`);

			const decoded = jwt.verify(accessToken, signingKey,{ audience: authConfig.audience });
			console.log(`verified: ${decoded}`);

			
		});

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