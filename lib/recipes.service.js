import faunadb from 'faunadb'
const q = faunadb.query

export class RecipesService {
	constructor(data) {
		this.client = data.client
	}

 	async getRecipes() {
		return new Promise((resolve, reject) => {
			this.client
				.query(q.Paginate(q.Match(q.Ref('indexes/all_recipes'))))
				.then((response) => {
					const itemRefs = response.data
					const getAllRecipeDataQuery = itemRefs.map(ref => {
						return q.Get(ref);
					})
					this.client.query(getAllRecipeDataQuery).then((ret) => {
						resolve(ret)
					})
				})
				.catch((error) => {
					console.log('error', error)

					reject(error)
				})
		})
	}
}
  

