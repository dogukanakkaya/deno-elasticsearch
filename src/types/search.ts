export interface SearchBody { }

export interface SearchHit {
    _index: string
    _type: string
    _id: string
    _score: number
    _source: unknown
}

export interface SearchResponse {
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
        hits: SearchHit[]
    }
}