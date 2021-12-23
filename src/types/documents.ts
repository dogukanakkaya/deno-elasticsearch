import {
    ShardStatistics,
    Index,
    Target,
    Timeout,
    VersionType,
    WaitForActiveShards
} from './index.ts'

export interface DocumentsGetRequestQueryParameters {
    preference?: string
    realtime?: boolean
    refresh?: boolean
    routing?: string
    stored_fields?: string
    _source?: boolean | string
    _source_excludes?: string
    _source_includes?: string
    version?: number
    version_type?: VersionType
}

export interface DocumentsGetRequest {
    index: Index
    _id: string
    queryParams?: DocumentsGetRequestQueryParameters
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

export interface DocumentsMGetDocs {
    _id: string
    _index?: string
    routing?: string
    _source?: boolean | string[] | {
        include?: string[]
        exclude?: string[]
    }
    _stored_fields?: string[]
}

export interface DocumentsMGetRequestBody {
    docs?: DocumentsMGetDocs[]
    ids?: string[]
}

export interface DocumentsMGetRequestQueryParams {
    preference?: string
    realtime?: boolean
    refresh?: boolean
    routing?: string
    _stored_fields?: string
    _source?: boolean | string
    _source_excludes?: string
    _source_includes?: string
}

export interface DocumentsMGetRequest {
    index?: Index
    body: DocumentsMGetRequestBody,
    queryParams?: DocumentsMGetRequestQueryParams
}

export interface DocumentsIndexRequestQueryParams {
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

export interface DocumentsIndexRequest {
    target: Target
    body: unknown
    _id: string
    queryParams?: DocumentsIndexRequestQueryParams
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

export interface DocumentsDeleteRequestQueryParams {
    if_seq_no?: number
    if_primary_term?: number
    refresh?: boolean | 'wait_for'
    routing?: string
    timeout?: Timeout
    version?: number
    version_type?: VersionType
    wait_for_active_shards?: WaitForActiveShards
}

export interface DocumentsDeleteRequest {
    index: Index
    _id: string
    queryParams?: DocumentsDeleteRequestQueryParams
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