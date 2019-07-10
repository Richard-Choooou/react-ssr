import { AxiosPromise } from 'axios'

export default {
    getClassifications(params: {
        page: number,
        limit: number, 
        filters?: object
    }, query: string): AxiosPromise {
        return this.graphql({
            query: `query {
                classifications(page: ${params.page}, limit: ${params.limit}) {
                    rows {
                        ${query}
                    }
                    count
                }
            }`,
            variable: {}
        })
    }
}