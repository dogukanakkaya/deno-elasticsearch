import {
    ShardStatistics,
    Index,
    Timeout,
    VersionType,
    WaitForActiveShards
} from './index.ts'

export interface CreateDocumentRequest {
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

export interface CreateDocumentResponse {
    _shards: ShardStatistics
    _index: Index
    _type: string
    _id: string
    _version: number
    _seq_no: number
    _primary_term: string
    result: string
}