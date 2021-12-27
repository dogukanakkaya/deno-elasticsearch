import Rest from './rest.ts'
import { toQueryString } from './helpers/request.ts'
import { ndserialize } from './helpers/serializer.ts'

import type {
    DocumentsGetRequest,
    DocumentsGetResponse,
    DocumentsMGetRequest,
    DocumentsIndexRequest,
    DocumentsIndexResponse,
    DocumentsDeleteRequest,
    DocumentsDeleteResponse,
    DocumentsBulkRequest
} from './types/index.ts'

export default class Documents extends Rest {
    get<T>({ index, _id, queryParams }: DocumentsGetRequest): Promise<DocumentsGetResponse<T>> {
        return this.request.send(`/${index}/_doc/${_id}?${toQueryString(queryParams)}`)
    }

    mget<T>({ index, body, queryParams }: DocumentsMGetRequest): Promise<DocumentsGetResponse<T>[]> {
        return this.request.send(`/${index ? `${index}/` : ''}_mget?source_content_type=application/json&source=${JSON.stringify(body)}&${toQueryString(queryParams)}`)
    }

    index({ target, _id, body, queryParams }: DocumentsIndexRequest): Promise<DocumentsIndexResponse> {
        return this.request.send(`/${target}/_create/${_id}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    upsert({ target, _id, body, queryParams }: DocumentsIndexRequest): Promise<DocumentsIndexResponse> {
        return this.request.send(`/${target}/_doc/${_id}?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    delete({ index, _id, queryParams }: DocumentsDeleteRequest): Promise<DocumentsDeleteResponse> {
        return this.request.send(`/${index}/_doc/${_id}?${toQueryString(queryParams)}`, {
            method: 'DELETE'
        })
    }

    exists({ index, _id, queryParams }: DocumentsGetRequest): Promise<boolean> {
        return this.request.send(`/${index}/_doc/${_id}?${toQueryString(queryParams)}`, {
            method: 'HEAD'
        }).then(() => true).catch(() => false)
    }

    bulk({ target, body, queryParams }: DocumentsBulkRequest) {
        return this.request.send(`/${target ? `${target}/` : ''}_bulk?${toQueryString(queryParams)}`, {
            method: 'POST',
            body: ndserialize(body)
        })
    }
}