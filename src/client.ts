import { encode } from '../deps.ts'
import Indices from './indices.ts'
import Documents from './documents.ts'
import Request, { toQueryString } from './helpers/request.ts'

import { SearchRequest, SearchResponse, HealthResponse } from './types/index.ts'

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

    search<T>({ target = '*', body, queryParams }: SearchRequest): Promise<SearchResponse<T>> {
        return this.#request.send(`/${target}/_search?${toQueryString(queryParams)}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
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