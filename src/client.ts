import Indices from './indices.ts'
import { send } from './helpers/request.ts'

import { SearchBody, SearchResponse, HealthResponse } from './types/index.ts'

export default class Client {
    #host: string
    indices: Indices;

    constructor(host: string) {
        this.#host = host
        this.indices = new Indices(this.#host)
    }

    health(): Promise<HealthResponse> {
        return send(`${this.#host}/_cluster/health`)
    }

    search(index: string, body: SearchBody): Promise<SearchResponse> {
        return send(`${this.#host}/${index}/_search?source_content_type=application/json&source=${JSON.stringify(body)}`)
    }
}
