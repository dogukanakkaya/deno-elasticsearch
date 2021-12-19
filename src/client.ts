import Indices from './indices.ts'
import Documents from './documents.ts'
import { send, toQueryString } from './helpers/request.ts'

import { SearchResponse, HealthResponse } from './types/index.ts'

export default class Client {
    #node: string
    indices: Indices
    documents: Documents

    constructor({ node }: { node: string }) {
        this.#node = node
        this.indices = new Indices({ node: this.#node })
        this.documents = new Documents({ node: this.#node })
    }

    health(): Promise<HealthResponse> {
        return send(`${this.#node}/_cluster/health`)
    }

    // TODO: queryParams type
    search<T>(index: string, body: unknown, queryParams: any = {}): Promise<SearchResponse<T>> {
        return send(`${this.#node}/${index}/_search?source_content_type=application/json&source=${JSON.stringify(body)}&${toQueryString(queryParams)}`)
    }
}
