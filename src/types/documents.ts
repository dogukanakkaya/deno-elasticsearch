import {
    ShardStatistics,
    Index,
    Timeout,
    VersionType,
    WaitForActiveShards
} from './index.ts'

export interface DocumentsGetRequest {
    preference?: string
    realtime?: boolean
    refresh?: boolean
    routing?: string
    stored_fields?: boolean
    _source?: boolean
    _source_excludes?: string
    _source_includes?: string
    version?: number
    version_type?: VersionType
}

export interface DocumentsGetResponse<T> {
    _index: Index
    _type: string
    _id: string
    _version: number
    _seq_no: number
    _primary_term: string
    found: boolean
    _routing?: string
    _source?: T
    _fields?: string
}

export interface DocumentsIndexRequest {
    if_seq_no?: number
    if_primary_term?: number
    op_type?: 'index' | 'create'
    pipeline?: string
    refresh?: boolean | 'wait_for'
    routing?: string
    timeout?: Timeout
    version?: number
    version_type?: VersionType
    wait_for_active_shards?: WaitForActiveShards
    require_alias?: boolean
}

export interface DocumentsIndexResponse {
    _shards: ShardStatistics
    _index: Index
    _type: string
    _id: string
    _version: number
    _seq_no: number
    _primary_term: string
    result: 'created' | 'updated'
}

export interface DocumentsDeleteRequest {
    if_seq_no?: number
    if_primary_term?: number
    refresh?: boolean | 'wait_for'
    routing?: string
    timeout?: Timeout
    version?: number
    version_type?: VersionType
    wait_for_active_shards?: WaitForActiveShards
}

export interface DocumentsDeleteResponse {
    _shards: ShardStatistics
    _index: Index
    _type: string
    _id: string
    _version: number
    _seq_no: number
    _fields?: string
    result?: 'deleted'
}