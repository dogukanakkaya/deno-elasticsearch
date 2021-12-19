export type Timeout = string | number

export type Index = string

export type Bytes = 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb'

export type WaitForActiveShards = number | 'all'

export type VersionType = 'external' | 'external_gte'

export interface CommonQueryParameters {
    error_trace?: boolean
    filter_path?: string
    human?: boolean
    pretty?: boolean
    source_query_string?: string
}

export interface CommonCatQueryParameters {
    format?: string
    h?: string
    help?: boolean
    local?: boolean
    master_timeout?: Timeout
    s?: string
    v?: boolean
}

export * from './client.ts'
export * from './search.ts'
export * from './indices.ts'
export * from './documents.ts'