import Rest from './rest.ts'
import { toQueryString } from '../helpers/mod.ts'

import type {
    Time,
    CommonQueryParameters,
    WaitForActiveShards
} from '../types.d.ts'

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

export interface IndiceIndexState {
    mappings?: unknown
    settings?: Record<string, any>
    aliases?: Record<string, IndiceAlias>
    data_stream?: string
}

export interface IndiceAlias {
    filter?: unknown
    index_routing?: string
    is_hidden?: boolean
    is_write_index?: boolean
    routing?: string
    search_routing?: string
}

export interface IndicesGetRequestQueryParams extends CommonQueryParameters {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}


export interface IndicesGetRequest {
    target: string
    queryParams?: IndicesGetRequestQueryParams
}

export interface IndicesGetResponse {
    [key: string]: IndiceIndexState
}

export interface IndicesCreateRequestBody {
    mappings?: unknown
    settings?: Record<string, any>
    aliases?: Record<string, IndiceAlias>
}

export interface IndicesCreateRequestQueryParams extends CommonQueryParameters {
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Time
    timeout?: Time
}

export interface IndicesCreateRequest {
    index: string
    body?: IndicesCreateRequestBody
    queryParams?: IndicesCreateRequestQueryParams
}

export interface IndicesCreateResponse {
    index: string
    shards_acknowledged: boolean
    acknowledged?: boolean
}

export interface IndicesDeleteRequestQueryParams extends CommonQueryParameters {
    expand_wildcards?: string
    ignore_unavailable?: boolean
    master_timeout?: Time
    timeout?: Time
}

export interface IndicesDeleteRequest {
    index: string
    queryParams?: IndicesDeleteRequestQueryParams
}

export interface IndicesDeleteResponse {
    acknowledged: boolean
}

export interface IndicesExistsRequestQueryParams extends CommonQueryParameters {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface IndicesExistsRequest {
    target: string
    queryParams?: IndicesExistsRequestQueryParams
}

export interface IndicesCloseRequestQueryParams extends CommonQueryParameters {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Time
    timeout?: Time
}

export interface IndicesCloseRequest {
    index: string
    queryParams?: IndicesCloseRequestQueryParams
}

export interface IndicesCloseResponse {
    acknowledged: boolean
}

export interface IndicesOpenRequestQueryParams extends CommonQueryParameters {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Time
    timeout?: Time
}

export interface IndicesOpenRequest {
    target: string
    queryParams?: IndicesOpenRequestQueryParams
}

export interface IndicesOpenResponse {
    acknowledged: boolean
}

export interface IndicesSettingsGetRequestQueryParams extends CommonQueryParameters {
    allow_no_indices?: boolean
    expand_wildcards?: string
    flat_settings?: boolean
    include_defaults?: boolean
    ignore_unavailable?: boolean
    local?: boolean
    master_timeout?: Time
}

export interface IndicesSettingsGetRequest {
    target: string
    setting?: string
    queryParams?: IndicesSettingsGetRequestQueryParams
}

export interface IndicesSettingsGetResponse {
    [key: string]: IndiceIndexState
}