import { send, toQueryString } from './helpers/request.ts'

import type {
    CatIndicesRequest,
    CatIndicesResponse,
    IndicesFindResponse,
    IndicesFindRequest,
    IndicesCreateBody,
    IndicesCreateRequest,
    IndicesCreateResponse,
    IndicesDeleteRequest,
    IndicesDeleteResponse,
    IndicesExistsRequest,
    IndicesStatusRequest,
    IndicesStatusResponse,
    IndicesSettingsFindRequest,
    IndicesSettingsFindResponse
} from './types/index.ts'

export default class Indices {
    #node: string

    constructor({ node }: { node: string }) {
        this.#node = node
    }

    findAll(target = '*', queryParams: CatIndicesRequest = {}): Promise<CatIndicesResponse> {
        return send(`${this.#node}/_cat/indices/${target}?format=json&pretty=1&${toQueryString(queryParams)}`)
    }

    find(target: string, queryParams: IndicesFindRequest = {}): Promise<IndicesFindResponse> {
        return send(`${this.#node}/${target}?${toQueryString(queryParams)}`)
    }

    create(target: string, body: IndicesCreateBody = {}, queryParams: IndicesCreateRequest = {}): Promise<IndicesCreateResponse> {
        return send(`${this.#node}/${target}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    destroy(target: string, queryParams: IndicesDeleteRequest = {}): Promise<IndicesDeleteResponse> {
        return send(`${this.#node}/${target}?${toQueryString(queryParams)}`, {
            method: 'DELETE'
        })
    }

    exists(target: string, queryParams: IndicesExistsRequest = {}): Promise<boolean> {
        return send(`${this.#node}/${target}?${toQueryString(queryParams)}`, {
            method: 'HEAD'
        }).then(() => true).catch(() => false)
    }

    close(target: string, queryParams: IndicesStatusRequest = {}): Promise<IndicesStatusResponse> {
        return send(`${this.#node}/${target}/_close?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    open(target: string, queryParams: IndicesStatusRequest = {}): Promise<IndicesStatusResponse> {
        return send(`${this.#node}/${target}/_open?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    settings(target: string, setting = '', queryParams: IndicesSettingsFindRequest = {}): Promise<IndicesSettingsFindResponse> {
        return send(`${this.#node}/${target}/_settings/${setting}?${toQueryString(queryParams)}`)
    }
}