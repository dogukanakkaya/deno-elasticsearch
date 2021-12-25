import {
    ShardStatistics,
    Timeout,
    VersionType,
    WaitForActiveShards,
    Refresh,
    CommonQueryParameters
} from './index.ts'

export interface DocumentsGetRequestQueryParameters extends CommonQueryParameters {
    preference?: string
    realtime?: boolean
    refresh?: Refresh
    routing?: string
    stored_fields?: string
    _source?: boolean | string
    _source_excludes?: string
    _source_includes?: string
    version?: number
    version_type?: VersionType
}

export interface DocumentsGetRequest {
    index: string
    _id: string
    queryParams?: DocumentsGetRequestQueryParameters
}

export interface DocumentsGetResponse<T> {
    _index: string
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

export interface DocumentsMGetRequestQueryParams extends CommonQueryParameters {
    preference?: string
    realtime?: boolean
    refresh?: Refresh
    routing?: string
    _stored_fields?: string
    _source?: boolean | string
    _source_excludes?: string
    _source_includes?: string
}

export interface DocumentsMGetRequest {
    index?: string
    body: DocumentsMGetRequestBody,
    queryParams?: DocumentsMGetRequestQueryParams
}

export interface DocumentsIndexRequestQueryParams extends CommonQueryParameters {
    if_seq_no?: number
    if_primary_term?: number
    op_type?: 'index' | 'create'
    pipeline?: string
    refresh?: Refresh<'wait_for'>
    routing?: string
    timeout?: Timeout
    version?: number
    version_type?: VersionType
    wait_for_active_shards?: WaitForActiveShards
    require_alias?: boolean
}

export interface DocumentsIndexRequest {
    target: string
    body: unknown
    _id: string
    queryParams?: DocumentsIndexRequestQueryParams
}

export interface DocumentsIndexResponse {
    _shards: ShardStatistics
    _index: string
    _type: string
    _id: string
    _version: number
    _seq_no: number
    _primary_term: string
    result: 'created' | 'updated'
}

export interface DocumentsDeleteRequestQueryParams extends CommonQueryParameters {
    if_seq_no?: number
    if_primary_term?: number
    refresh?: Refresh<'wait_for'>
    routing?: string
    timeout?: Timeout
    version?: number
    version_type?: VersionType
    wait_for_active_shards?: WaitForActiveShards
}

export interface DocumentsDeleteRequest {
    index: string
    _id: string
    queryParams?: DocumentsDeleteRequestQueryParams
}

export interface DocumentsDeleteResponse {
    _shards: ShardStatistics
    _index: string
    _type: string
    _id: string
    _version: number
    _seq_no: number
    _fields?: string
    result?: 'deleted'
}

export interface DocumentsBulkOperationBody {
    _index?: string
    _id?: string
    require_alias?: boolean
    dynamic_templates?: Record<string, string>
}

export interface DocumentsBulkRequestBody {
    create?: DocumentsBulkOperationBody
    delete?: Omit<DocumentsBulkOperationBody, 'dynamic_templates'>
    index?: DocumentsBulkOperationBody
    update?: Omit<DocumentsBulkOperationBody, 'dynamic_templates'>
    doc?: unknown
}

export interface DocumentsBulkRequestQueryParams extends CommonQueryParameters {
    pipeline?: string
    refresh?: Refresh<'wait_for'>
    require_alias?: boolean
    routing?: string
    _source?: boolean | string
    _source_excludes?: string
    _source_includes?: string
    timeout?: Timeout
    wait_for_active_shards?: WaitForActiveShards
}

export interface DocumentsBulkRequest<T = unknown> {
    target?: string
    body: (DocumentsBulkRequestBody | T)[]
    queryParams?: DocumentsBulkRequestQueryParams
}