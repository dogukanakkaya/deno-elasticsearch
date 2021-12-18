import Indices from './indices.ts'
import { IHealthResponse, ISearchBody, ISearchResponse } from './types.ts'
import { send } from './helpers/request.ts'

export default class Client {
    #host: string
    indices: Indices;

    constructor(host: string) {
        this.#host = host
        this.indices = new Indices(this.#host)
    }

    health(): Promise<IHealthResponse> {
        return send(`${this.#host}/_cluster/health`)
    }

    search(index: string, body: ISearchBody): Promise<ISearchResponse> {
        return send(`${this.#host}/${index}/_search?source_content_type=application/json&source=${JSON.stringify(body)}`)
    }
}
