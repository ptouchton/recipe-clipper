import faunadb from 'faunadb'
require('dotenv').config()

const headers = {
	'Access-Control-Allow-Origin': 'http://localhost:4200',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export { client, headers }