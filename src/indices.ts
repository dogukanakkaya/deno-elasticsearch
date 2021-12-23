import Request, { toQueryString } from './helpers/request.ts'

import type {
    CatIndicesRequest,
    CatIndicesResponse,
    IndicesGetRequest,
    IndicesGetResponse,
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
    #request: Request

    constructor(request: Request) {
        this.#request = request
    }

    getAll(target = '*', queryParams: CatIndicesRequest = {}): Promise<CatIndicesResponse> {
        return this.#request.send(`/_cat/indices/${target}?format=json&pretty=1&${toQueryString(queryParams)}`)
    }

    get(target: string, queryParams: IndicesGetRequest = {}): Promise<IndicesGetResponse> {
        return this.#request.send(`/${target}?${toQueryString(queryParams)}`)
    }

    create(target: string, body: IndicesCreateBody = {}, queryParams: IndicesCreateRequest = {}): Promise<IndicesCreateResponse> {
        return this.#request.send(`/${target}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    delete(target: string, queryParams: IndicesDeleteRequest = {}): Promise<IndicesDeleteResponse> {
        return this.#request.send(`/${target}?${toQueryString(queryParams)}`, {
            method: 'DELETE'
        })
    }

    exists(target: string, queryParams: IndicesExistsRequest = {}): Promise<boolean> {
        return this.#request.send(`/${target}?${toQueryString(queryParams)}`, {
            method: 'HEAD'
        }).then(() => true).catch(() => false)
    }

    close(target: string, queryParams: IndicesStatusRequest = {}): Promise<IndicesStatusResponse> {
        return this.#request.send(`/${target}/_close?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    open(target: string, queryParams: IndicesStatusRequest = {}): Promise<IndicesStatusResponse> {
        return this.#request.send(`/${target}/_open?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    settings(target: string, setting = '', queryParams: IndicesSettingsFindRequest = {}): Promise<IndicesSettingsFindResponse> {
        return this.#request.send(`/${target}/_settings/${setting}?${toQueryString(queryParams)}`)
    }
}