import {
    ICatIndice,
    IIndice,
    IIndiceBody,
    IFindIndiceQueryString,
    ICreateIndiceQueryString,
    IDeleteIndiceQueryString,
    IExistsIndiceQueryString,
    IStatusIndiceQueryString
} from './types.ts'
import { send, toQueryString } from './helpers/request.ts'

export default class Indices {
    #host: string

    constructor(host: string) {
        this.#host = host
    }

    findAll(): Promise<ICatIndice[]> {
        return send(`${this.#host}/_cat/indices?format=json&pretty=1`)
    }

    find(
        index: string,
        queryParams: IFindIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'open', flat_settings: false, include_defaults: false, ignore_unavailable: false, local: false }
    ): Promise<IIndice> {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`)
    }

    create(
        index: string,
        body: IIndiceBody = {},
        queryParams: ICreateIndiceQueryString = { wait_for_active_shards: 1, master_timeout: '30s', timeout: '30s' }
    ) {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    destroy(
        index: string,
        queryParams: IDeleteIndiceQueryString = { expand_wildcards: 'open,closed', ignore_unavailable: false, master_timeout: '30s', timeout: '30s' }
    ) {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`, {
            method: 'DELETE'
        })
    }

    exists(
        index: string,
        queryParams: IExistsIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'open', flat_settings: false, include_defaults: false, ignore_unavailable: false, local: false }
    ): Promise<boolean> {
        return send(`${this.#host}/${index}?${toQueryString(queryParams)}`, {
            method: 'HEAD'
        }).then(() => true).catch(() => false)
    }

    close(
        index: string,
        queryParams: IStatusIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'open', ignore_unavailable: false, master_timeout: '30s', timeout: '30s' }
    ): Promise<boolean> {
        return send(`${this.#host}/${index}/_close?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    open(
        index: string,
        queryParams: IStatusIndiceQueryString = { allow_no_indices: true, expand_wildcards: 'closed', ignore_unavailable: false, master_timeout: '30s', timeout: '30s' }
    ): Promise<boolean> {
        return send(`${this.#host}/${index}/_open?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }
}