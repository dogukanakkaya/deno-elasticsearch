export type Timeout = string | number

export type Index = string

export type Bytes = 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb'

export type WaitForActiveShards = number | 'all'

export type VersionType = 'external' | 'external_gte'

export enum Health {
    Red = 'red',
    Yellow = 'yellow',
    Green = 'green'
}

export interface HealthResponse {
    cluster_name: string
    status: Health
    timed_out: boolean,
    number_of_nodes: number
    number_of_data_nodes: number
    active_primary_shards: number
    active_shards: number
    relocating_shards: number
    initializing_shards: number
    unassigned_shards: number
    delayed_unassigned_shards: number
    number_of_pending_tasks: number
    number_of_in_flight_fetch: number
    task_max_waiting_in_queue_millis: number
    active_shards_percent_as_number: number
}

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

export * from './search.ts'
export * from './indices.ts'
export * from './documents.ts'