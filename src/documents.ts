import Request, { toQueryString } from './helpers/request.ts'

import type {
    DocumentsFindRequest,
    DocumentsFindResponse,
    DocumentsIndexRequest,
    DocumentsIndexResponse,
    DocumentsDeleteRequest,
    DocumentsDeleteResponse
} from './types/index.ts'

export default class Documents {
    #request: Request

    constructor(request: Request) {
        this.#request = request
    }

    find<T>(target: string, _id: string, queryParams: DocumentsFindRequest = {}): Promise<DocumentsFindResponse<T>> {
        return this.#request.send(`/${target}/_doc/${_id}?${toQueryString(queryParams)}`)
    }

    create(target: string, _id: string, body: unknown, queryParams: DocumentsIndexRequest = {}): Promise<DocumentsIndexResponse> {
        return this.#request.send(`/${target}/_create/${_id}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    upsert(target: string, _id: string, body: unknown, queryParams: DocumentsIndexRequest = {}): Promise<DocumentsIndexResponse> {
        return this.#request.send(`/${target}/_doc/${_id}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    delete(target: string, _id: string, queryParams: DocumentsDeleteRequest = {}): Promise<DocumentsDeleteResponse> {
        return this.#request.send(`/${target}/_doc/${_id}?${toQueryString(queryParams)}`, {
            method: 'DELETE'
        })
    }

    exists(target: string, _id: string, queryParams: DocumentsFindRequest = {}): Promise<boolean> {
        return this.#request.send(`/${target}/_doc/${_id}?${toQueryString(queryParams)}`, {
            method: 'HEAD'
        }).then(() => true).catch(() => false)
    }
}