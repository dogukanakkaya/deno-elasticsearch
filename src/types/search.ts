import { Time } from './index.ts'

export type SearchType = 'query_then_fetch' | 'dfs_query_then_fetch'

export type SuggestMode = 'always' | 'missing' | 'popular'

export interface SearchRequestQueryParams {
    allow_no_indices?: boolean
    allow_partial_search_results?: boolean
    analyzer?: string
    analyze_wildcard?: boolean
    batched_reduce_size?: number
    ccs_minimize_roundtrips?: boolean
    default_operator?: 'AND' | 'OR'
    df?: string
    docvalue_fields?: string
    expand_wildcards?: string
    explain?: boolean
    from?: number
    ignore_throttled?: boolean
    ignore_unavailable?: boolean
    lenient?: boolean
    max_concurrent_shard_requests?: number
    pre_filter_shard_size?: number
    preference?: string
    q?: string
    request_cache?: boolean
    rest_total_hits_as_int?: boolean
    routing?: string
    scroll?: Time
    search_type?: SearchType
    seq_no_primary_term?: boolean
    size?: number
    sort?: string
    _source?: boolean | string
    _source_excludes?: string
    _source_includes?: string
    stats?: string
    stored_fields?: string
    suggest_field?: string
    suggest_mode?: SuggestMode
    suggest_size?: number
    suggest_text?: string
    terminate_after?: number
    timeout?: Time
    track_scores?: boolean
    track_total_hits?: boolean | number
    typed_keys?: boolean
    version?: boolean
}

export interface SearchRequest {
    target?: string
    body: unknown
    queryParams?: SearchRequestQueryParams
}

export interface SearchHit<T> {
    _index: string
    _type: string
    _id: string
    _score: number
    _source: T
}

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

export interface Explanation {
    value: number
    description: string
    details: Explanation[]
}

export interface SearchResponse<T> {
    took: number
    timed_out: boolean
    _scroll_id?: string
    _shards: ShardStatistics
    hits: {
        total: number
        max_score: number
        hits: SearchHit<T>[]
        _version?: number
        _explanation?: Explanation
        fields?: any
        highlight?: any
        inner_hits?: any
        matched_queries?: string[]
        sort?: string[]
    }
    aggregations?: any
}