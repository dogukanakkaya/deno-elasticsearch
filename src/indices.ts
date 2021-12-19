import { send, toQueryString } from './helpers/request.ts'

import type {
    CatIndice,
    Indice,
    IndiceBody,
    FindIndiceQueryString,
    CreateIndiceQueryString,
    DeleteIndiceQueryString,
    ExistsIndiceQueryString,
    StatusIndiceQueryString
} from './types/index.ts'

export default class Indices {
    #host: string

    constructor(host: string) {
        this.#host = host
    }

    findAll(): Promise<CatIndice[]> {
        return send(`${this.#host}/_cat/indices?format=json&pretty=1`)
    }

    find(
        index: string,
        queryParams: FindIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'open', flat_settings: false, include_defaults: false, ignore_unavailable: false, local: false }
    ): Promise<Indice> {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`)
    }

    create(
        index: string,
        body: IndiceBody = {},
        queryParams: CreateIndiceQueryString = { wait_for_active_shards: 1, master_timeout: '30s', timeout: '30s' }
    ) {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    destroy(
        index: string,
        queryParams: DeleteIndiceQueryString = { expand_wildcards: 'open,closed', ignore_unavailable: false, master_timeout: '30s', timeout: '30s' }
    ) {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`, {
            method: 'DELETE'
        })
    }

    exists(
        index: string,
        queryParams: ExistsIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'open', flat_settings: false, include_defaults: false, ignore_unavailable: false, local: false }
    ): Promise<boolean> {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`, {
            method: 'HEAD'
        }).then(() => true).catch(() => false)
    }

    close(
        index: string,
        queryParams: StatusIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'open', ignore_unavailable: false, master_timeout: '30s', timeout: '30s' }
    ) {
        return send(`${this.#host}/${index}/_close?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    open(
        index: string,
        queryParams: StatusIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'closed', ignore_unavailable: false, master_timeout: '30s', timeout: '30s' }
    ) {
        return send(`${this.#host}/${index}/_open?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }
}