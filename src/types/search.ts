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