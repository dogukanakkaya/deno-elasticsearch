export type Time = string

export type Bytes = 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb'

export type WaitForActiveShards = number | 'all'

export type WaitForEvents = 'immediate' | 'urgent' | 'high' | 'normal' | 'low' | 'languid'

export type VersionType = 'external' | 'external_gte'

export type Health = 'green' | 'yellow' | 'red'

export type Refresh<T = void> = boolean | T

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

export * from './cluster.ts'
export * from './cat.ts'
export * from './search.ts'
export * from './indices.ts'
export * from './documents.ts'