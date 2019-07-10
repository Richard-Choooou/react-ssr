import axios, { AxiosPromise } from 'axios'
import baseConfig from './config'
import goods from './modules/goods'
import classifications from './modules/classifications'

const modules = [goods, classifications]

type modulesType = typeof goods & typeof classifications

class Fetch {
    constructor() {
        modules.forEach(_module => {
            for(let [fnName, fn] of Object.entries(_module)) {
                this[fnName] = fn
            }
        })
    }

    private getData(config): AxiosPromise {
        const req = axios.create()
        req.interceptors.request.use(...config.reqInterceptors)
        req.interceptors.response.use(...config.repInterceptors)
        return req.request(config)
    }

    public graphql(data: {
        query: string,
        variable: object
    }): AxiosPromise {
        const upload = {
            url: '/api/v1/graphql',
            method: 'post',
            data: data
        }

        return this.getData(Object.assign({}, baseConfig, upload))
    }
}

export default new Fetch() as Fetch & modulesType