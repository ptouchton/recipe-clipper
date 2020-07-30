import faunadb from 'faunadb'
import { flattenDataKeys } from './utils'
import { get } from 'http'
const q = faunadb.query

export class RecipesService {
	constructor(data) {
		this.client = data.client
	}

	async getRecipes() {
		return new Promise((resolve, reject) => {
			this.client
				.query(
					q.Map(
					q.Paginate(q.Documents(q.Collection('recipes'))),
					q.Lambda('x', q.Get(q.Var('x')))
					)).then((response) => {

						resolve(response)
					})
				// .query(q.Paginate(q.Match(q.Index('all_recipes'))))
				// .then((response) => {
				// 	const itemRefs = response.data;

				// 	const getAllRecipeDataQuery = itemRefs.map(ref => {
				// 		return q.Get(ref);
				// 	})
				// 	this.client.query(getAllRecipeDataQuery).then((ret) => {

				// 		let res = flattenDataKeys(ret);
				// 		resolve(res)
				// 	})
				// })
				.catch((error) => {
					console.log('error', error)

					reject(error)
				})
		})
	}
}


