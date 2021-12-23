import type {
    Health,
    Timeout,
    Index,
    Target,
    CommonCatQueryParameters,
    Bytes,
    WaitForActiveShards
} from './index.ts'

export interface IndiceIndexState {
    mappings?: unknown
    settings?: Record<string, any>
    aliases?: Record<Index, IndiceAlias>
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

export interface CatIndice {
    health: Health
    status: string
    index: string
    uuid: string
    pri: number
    rep: number
    'docs.count'?: number
    'docs.deleted'?: number
    'store.size'?: string
    'pri.store.size'?: string
}

export interface CatIndicesRequestQueryParams extends CommonCatQueryParameters {
    bytes?: Bytes
    expand_wildcards?: string
    health?: Health
    include_unloaded_segments?: boolean
    pri?: boolean
}

export interface CatIndicesRequest {
    target?: Target
    queryParams?: CatIndicesRequestQueryParams
}

export type CatIndicesResponse = CatIndice[]

export interface IndicesGetRequestQueryParams {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}


export interface IndicesGetRequest {
    target: Target
    queryParams?: IndicesGetRequestQueryParams
}

export interface IndicesGetResponse {
    [key: Index]: IndiceIndexState
}

export interface IndicesCreateRequestBody {
    mappings?: unknown
    settings?: Record<string, any>
    aliases?: Record<Index, IndiceAlias>
}

export interface IndicesCreateRequestQueryParams {
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Timeout
    timeout?: Timeout
}

export interface IndicesCreateRequest {
    index: Index
    body?: IndicesCreateRequestBody
    queryParams?: IndicesCreateRequestQueryParams
}

export interface IndicesCreateResponse {
    index: Index
    shards_acknowledged: boolean
    acknowledged?: boolean
}

export interface IndicesDeleteRequestQueryParams {
    expand_wildcards?: string
    ignore_unavailable?: boolean
    master_timeout?: Timeout
    timeout?: Timeout
}

export interface IndicesDeleteRequest {
    index: Index
    queryParams?: IndicesDeleteRequestQueryParams
}

export interface IndicesDeleteResponse {
    acknowledged: boolean
}

export interface IndicesExistsRequestQueryParams {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface IndicesExistsRequest {
    target: Target
    queryParams?: IndicesExistsRequestQueryParams
}

export interface IndicesCloseRequestQueryParams {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Timeout
    timeout?: Timeout
}

export interface IndicesCloseRequest {
    index: Index
    queryParams?: IndicesCloseRequestQueryParams
}

export interface IndicesCloseResponse {
    acknowledged: boolean
}

export interface IndicesOpenRequestQueryParams {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Timeout
    timeout?: Timeout
}

export interface IndicesOpenRequest {
    target: Target
    queryParams?: IndicesOpenRequestQueryParams
}

export interface IndicesOpenResponse {
    acknowledged: boolean
}

export interface IndicesSettingsGetRequestQueryParams {
    allow_no_indices?: boolean
    expand_wildcards?: string
    flat_settings?: boolean
    include_defaults?: boolean
    ignore_unavailable?: boolean
    local?: boolean
    master_timeout?: Timeout
}

export interface IndicesSettingsGetRequest {
    target: Target
    setting?: string
    queryParams?: IndicesSettingsGetRequestQueryParams
}

export interface IndicesSettingsGetResponse {
    [key: Index]: IndiceIndexState
}