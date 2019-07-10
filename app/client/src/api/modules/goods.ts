import { AxiosPromise } from 'axios'

export default {
    getGoodsList(params: {
        page: number,
        limit: number,
        filters: object
    }, query) {
        return this.graphql({
            query: `query {
                products(page: ${params.page}, limit: ${params.limit}, filters: ${JSON.stringify(params.filters)}) {
                    rows {
                        ${query}
                    }
                    count
                }
            }`,
            variable: {}
        })
    },

    getOneGoods(id: string, query: string): AxiosPromise {
        return this.graphql({
            query: `query {
                product(id: ${id}) {
                    ${query}
                }
            }`,
            variable: {}
        })
    }
}