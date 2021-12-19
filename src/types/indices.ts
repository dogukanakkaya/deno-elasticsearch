import type {
    Health,
    Timeout,
    Index,
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

export type CatIndicesResponse = CatIndice[]

export interface CatIndicesRequest extends CommonCatQueryParameters {
    bytes?: Bytes
    expand_wildcards?: string
    health?: Health
    include_unloaded_segments?: boolean
    pri?: boolean
}

export interface IndicesFindRequest {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface IndicesFindResponse {
    [key: Index]: IndiceIndexState
}

export interface IndicesCreateBody {
    mappings?: unknown
    settings?: Record<string, any>
    aliases?: Record<Index, IndiceAlias>
}

export interface IndicesCreateRequest {
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Timeout
    timeout?: Timeout
}

export interface IndicesCreateResponse {
    index: Index
    shards_acknowledged: boolean
    acknowledged?: boolean
}

export interface IndicesDeleteRequest {
    expand_wildcards?: string
    ignore_unavailable?: boolean
    master_timeout?: Timeout
    timeout?: Timeout
}

export interface IndicesDeleteResponse {
    acknowledged: boolean
}

export interface IndicesExistsRequest {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface IndicesStatusRequest {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    wait_for_active_shards?: WaitForActiveShards
    master_timeout?: Timeout
    timeout?: Timeout
}

export interface IndicesStatusResponse {
    acknowledged: boolean
}

export interface IndicesSettingsFindRequest {
    allow_no_indices?: boolean
    expand_wildcards?: string
    flat_settings?: boolean
    include_defaults?: boolean
    ignore_unavailable?: boolean
    local?: boolean
    master_timeout?: Timeout
}

export interface IndicesSettingsFindResponse {
    [key: Index]: IndiceIndexState
}