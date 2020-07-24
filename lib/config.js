import faunadb from 'faunadb'
require('dotenv').config()

const headers = {
	'Access-Control-Allow-Origin': 'http://localhost:4200',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

// Set up Auth0 configuration
const authConfig = {
	domain: 'dev-1ri5oc4g.us.auth0.com',
	audience: 'http://localhost:9000/.netlify/functions',
};

const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
})

const jwksUri = `https://${authConfig.domain}/.well-known/jwks.json`

export { client, headers, authConfig, jwksUri }