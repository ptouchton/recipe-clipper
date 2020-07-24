import {  authConfig, jwksUri } from './config.js';
import jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';
import { promisify } from 'util';


export class AuthCheck {

	async verify(event) {

		try {

			const myClient = jwks({
				strictSsl: true, // Default value
				jwksUri: jwksUri, //from config
				requestHeaders: {}, // Optional
				requestAgentOptions: {}, // Optional
				timeout: 3000, // Defaults to 30s
			});

			const authHeader = event.headers.authorization;

			const parts = authHeader.split(" ");
			if (parts.length !== 2 || parts[0] !== "Bearer") {
				// No access token was passed
				return null;
			}
			const accessToken = parts[1];

			// This could fail.  If it does handle as 401 as the token is invalid.
			var decodedToken = jwt.decode(accessToken, { complete: true });

			// promisify the function:
			const getSigningKey = promisify(myClient.getSigningKey);

			// use it like any other promise:
			const key = await getSigningKey(decodedToken.header.kid);

			const decoded = jwt.verify(accessToken, key.publicKey, { audience: authConfig.audience });

			return decoded;

		} catch (error) {
			console.log('authcheck.verify error', JSON.stringify(error))

			throw error;
		}

	}
}