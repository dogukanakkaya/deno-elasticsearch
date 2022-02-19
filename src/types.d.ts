export type Time = string

export type Bytes = string

export type WaitForActiveShards = number | 'all'

export type WaitForEvents = 'immediate' | 'urgent' | 'high' | 'normal' | 'low' | 'languid'

export type VersionType = 'external' | 'external_gte'

export type Health = 'green' | 'yellow' | 'red'

export type ExpandWildcards = 'all' | 'open' | 'closed' | 'hidden' | 'none'

export type Refresh<T = void> = boolean | T

export interface ShardFailure {
    index?: string
    node?: string
    reason: any
    shard: number
    status?: string
}

export interface ShardStatistics {
    total: number
    successful: number
    failed: number
    skipped?: number
    failures?: ShardFailure[]
}

export interface ErrorCause {
    type: string
    reason: string
    'resource.type': string
    'resource.id': string
    index_uuid: string
    index: string
}

export interface ErrorResponseBase {
    error: {
        root_cause: ErrorCause[]
    }
    status: number
}

export interface CommonQueryParameters {
    error_trace?: boolean
    filter_path?: string
    human?: boolean
    pretty?: boolean
    format?: string
}

export * from './rest/cluster.ts'
export * from './rest/cat.ts'
export * from './rest/indices.ts'
export * from './rest/documents.ts'
export * from './rest/sql.ts'
export * from './client.ts'