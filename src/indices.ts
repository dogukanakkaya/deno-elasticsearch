import Rest from './rest.ts'
import { toQueryString } from './helpers/request.ts'

import type {
    IndicesGetRequest,
    IndicesGetResponse,
    IndicesCreateRequest,
    IndicesCreateResponse,
    IndicesDeleteRequest,
    IndicesDeleteResponse,
    IndicesExistsRequest,
    IndicesCloseRequest,
    IndicesCloseResponse,
    IndicesOpenRequest,
    IndicesOpenResponse,
    IndicesSettingsGetRequest,
    IndicesSettingsGetResponse
} from './types/index.ts'

export default class Indices extends Rest {
    get({ target, queryParams }: IndicesGetRequest): Promise<IndicesGetResponse> {
        return this.request.send(`/${target}?${toQueryString(queryParams)}`)
    }

    create({ index, body, queryParams }: IndicesCreateRequest): Promise<IndicesCreateResponse> {
        return this.request.send(`/${index}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    delete({ index, queryParams }: IndicesDeleteRequest): Promise<IndicesDeleteResponse> {
        return this.request.send(`/${index}?${toQueryString(queryParams)}`, {
            method: 'DELETE'
        })
    }

    exists({ target, queryParams }: IndicesExistsRequest): Promise<boolean> {
        return this.request.send(`/${target}?${toQueryString(queryParams)}`, {
            method: 'HEAD'
        }).then(() => true).catch(() => false)
    }

    close({ index, queryParams }: IndicesCloseRequest): Promise<IndicesCloseResponse> {
        return this.request.send(`/${index}/_close?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    open({ target, queryParams }: IndicesOpenRequest): Promise<IndicesOpenResponse> {
        return this.request.send(`/${target}/_open?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }

    settings({ target, setting, queryParams }: IndicesSettingsGetRequest): Promise<IndicesSettingsGetResponse> {
        return this.request.send(`/${target}/_settings/${setting}?${toQueryString(queryParams)}`)
    }
}