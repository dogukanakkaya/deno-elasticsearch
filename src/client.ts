import { encode } from '../deps.ts'
import Indices from './indices.ts'
import Documents from './documents.ts'
import Request, { toQueryString } from './helpers/request.ts'

import { SearchResponse, HealthResponse } from './types/index.ts'

export default class Client {
    readonly #options: ClientOptions
    readonly #request: Request
    readonly indices: Indices
    readonly documents: Documents

    constructor(options: ClientOptions) {
        this.#options = options

        this.#request = new Request(this.#options.node, {
            headers: this.#createHeaders()
        })

        this.indices = new Indices(this.#request)
        this.documents = new Documents(this.#request)
    }

    #createHeaders(): Headers {
        const headers: Headers = new Headers()

        headers.append('Content-Type', 'application/json')

        if (this.#options.auth) {
            const { username, password } = this.#options.auth

            headers.append('Authorization', `Basic ${encode(`${username}:${password}`)}`)
        }

        return headers
    }

    health(): Promise<HealthResponse> {
        return this.#request.send(`/_cluster/health`)
    }

    // TODO: queryParams type
    search<T>(index: string, body: unknown, queryParams: any = {}): Promise<SearchResponse<T>> {
        return this.#request.send(`/${index}/_search?source_content_type=application/json&source=${JSON.stringify(body)}&${toQueryString(queryParams)}`)
    }
}

interface ClientAuth {
    username: string
    password: string
}

interface ClientOptions {
    node: string
    auth?: ClientAuth
}