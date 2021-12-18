enum Health {
    Red = 'red',
    Yellow = 'yellow',
    Green = 'green'
}

enum IndiceStatus {
    All = 'all',
    Open = 'open',
    Closed = 'closed',
    Hidden = 'hidden',
    None = 'none'
}

/** Health */
export interface IHealthResponse {
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


/** Search */
export interface ISearchBody { }

interface ISearchHit {
    _index: string
    _type: string
    _id: string
    _score: number
    _source: unknown
}

export interface ISearchResponse {
    took: number
    timed_out: boolean
    _shards: {
        total: number
        successful: number
        skipped: number
        failed: number
    }
    hits: {
        total: number
        max_score: number
        hits: ISearchHit[]
    }
}

/** Indices */
export interface ICatIndice {
    health: Health
    status: IndiceStatus
    index: string
    uuid: string
    pri: number
    rep: number
    'docs.count'?: number
    'docs.deleted'?: number
    'store.size'?: string
    'pri.store.size'?: string
}

export interface IIndice {
    [key: string]: Required<IIndiceBody>
}

export interface IIndiceBody {
    mappings?: unknown
    settings?: unknown
    aliases?: unknown
}

interface IIndiceTimeouts {
    master_timeout?: string
    timeout?: string
}

export interface ICreateIndiceQueryString extends IIndiceTimeouts {
    wait_for_active_shards?: number
}

export interface IDeleteIndiceQueryString extends IIndiceTimeouts {
    expand_wildcards?: string
    ignore_unavailable?: boolean
}

export interface IFindIndiceQueryString {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface IExistsIndiceQueryString {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface IStatusIndiceQueryString extends IIndiceTimeouts {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
}