import Rest from './rest.ts'
import { toQueryString } from '../helpers/mod.ts'

import type {
    Time,
    CommonQueryParameters,
    WaitForActiveShards,
    ExpandWildcards,
    ShardStatistics
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

    clone({ index, targetIndex, body, queryParams }: IndicesCreateRequest & { targetIndex: string }): Promise<IndicesCreateResponse> {
        return this.request.send(`/${index}/_clone/${targetIndex}?${toQueryString(queryParams)}`, {
            method: 'POST',
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

    settings({ target, setting = '', queryParams }: IndicesSettingsGetRequest): Promise<IndicesSettingsGetResponse> {
        return this.request.send(`/${target}/_settings/${setting}?${toQueryString(queryParams)}`)
    }

    updateSettings({ target, body, queryParams }: IndicesUpdateSettingsRequest): Promise<IndicesUpdateSettingsResponse> {
        return this.request.send(`/${target}/_settings/?${toQueryString(queryParams)}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })
    }

    refresh({ target = '*', queryParams }: IndicesRefreshRequest): Promise<IndicesRefreshResponse> {
        return this.request.send(`/${target}/_refresh?${toQueryString(queryParams)}`, {
            method: 'POST'
        })
    }
}

export interface IndiceIndexState {
    mappings?: unknown
    settings?: StaticSettings & DynamicSettings
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
    settings?: StaticSettings
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

export interface IndicesUpdateSettingsRequestBody {
    mappings?: unknown
    settings?: DynamicSettings
    aliases?: Record<string, IndiceAlias>
}

export interface IndicesUpdateSettingsRequestQueryParams extends CommonQueryParameters {
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Time
    timeout?: Time
}

export interface IndicesUpdateSettingsRequest {
    target: string
    body?: IndicesUpdateSettingsRequestBody
    queryParams?: IndicesUpdateSettingsRequestQueryParams
}

export interface IndicesUpdateSettingsResponse {
    acknowledged: boolean
}

export interface IndicesRefreshRequestQueryParams extends CommonQueryParameters {
    allow_no_indices?: boolean
    expand_wildcards?: ExpandWildcards
    ignore_unavailable?: boolean
}

export interface IndicesRefreshRequest {
    target: string
    queryParams?: IndicesRefreshRequestQueryParams
}

export interface IndicesRefreshResponse {
    _shards: ShardStatistics
}

export interface StaticSettings {
    index: {
        number_of_shards?: number
        number_of_routing_shards?: number
        codec?: string
        routing_partition_size?: number
        'soft_deletes.retention_lease.period'?: string
        load_fixed_bitset_filters_eagerly?: boolean
        'shard.check_on_startup'?: boolean | 'checksum'
    }
}

export interface DynamicSettings {
    index: {
        blocks?: IndexBlocks
        number_of_replicas?: number
        auto_expand_replicas?: string | boolean
        'search.idle.after'?: Time
        refresh_interval?: Time
        max_result_window?: number
        max_inner_result_window?: number
        max_rescore_window?: number
        max_docvalue_fields_search?: number
        max_script_fields?: number
        max_ngram_diff?: number
        max_shingle_diff?: number
        max_refresh_listeners?: number
        'analyze.max_token_count'?: number
        'highlight.max_analyzed_offset'?: number
        max_terms_count?: number
        max_regex_length?: number
        'query.default_field'?: string
        'routing.allocation.enable'?: 'all' | 'primaries' | 'new_primaries' | 'none'
        'routing.rebalance.enable'?: 'all' | 'primaries' | 'replicas' | 'none'
        gc_deletes?: Time
        default_pipeline?: string
        final_pipeline?: string
        hidden?: boolean
    }
}

export interface IndexBlocks {
    read_only?: boolean
    read_only_allow_delete?: boolean;
    read?: boolean;
    write?: boolean;
    metadata?: boolean;
}