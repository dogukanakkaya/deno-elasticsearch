import { encode } from '../deps.ts'
import Cluster from './cluster.ts'
import Cat from './cat.ts'
import Indices from './indices.ts'
import Documents from './documents.ts'
import Request, { toQueryString } from './helpers/request.ts'
import { ndserialize } from './helpers/serializer.ts'

import {
    SearchRequest,
    SearchResponse,
    MSearchRequest,
    MSearchResponse
} from './types/index.ts'

export default class Client {
    readonly #options: ClientOptions
    readonly #request: Request
    readonly cluster: Cluster
    readonly cat: Cat
    readonly indices: Indices
    readonly documents: Documents

    constructor(options: ClientOptions) {
        this.#options = options

        this.#request = new Request(this.#options.node, {
            headers: this.#createHeaders()
        })

        this.cluster = new Cluster(this.#request)
        this.cat = new Cat(this.#request)
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

    search<T>({ target = '*', body, queryParams }: SearchRequest): Promise<SearchResponse<T>> {
        return this.#request.send(`/${target}/_search?${toQueryString(queryParams)}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }

    msearch<T>({ target = '*', body, queryParams }: MSearchRequest): Promise<MSearchResponse<T>> {
        return this.#request.send(`/${target}/_msearch?${toQueryString(queryParams)}`, {
            method: 'POST',
            body: ndserialize(body)
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