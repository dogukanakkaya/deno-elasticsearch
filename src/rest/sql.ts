import Rest from './rest.ts'
import { toQueryString } from '../helpers/mod.ts'

import type {
    Time
} from '../types.d.ts'

export default class Sql extends Rest {
    search({ body, queryParams = { format: 'json' } }: SqlSearchRequest): Promise<SqlSearchResponse> {
        return this.request.send(`/_sql?${toQueryString(queryParams)}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }
}

export type SqlSearchResponseFormats = 'csv' | 'json' | 'tsv' | 'txt' | 'yaml' | 'cbor' | 'smile'

export type RuntimeMappingType = 'boolean' | 'composite' | 'date' | 'double' | 'geo_point' | 'ip' | 'keyword' | 'long'

export interface RuntimeMappings {
    [key: string]: {
        type: RuntimeMappingType
        script?: string
    }
}

export interface SqlSearchRequestQueryParams {
    format?: SqlSearchResponseFormats
    delimiter?: string
}

export interface SqlSearchRequestBody {
    catalog?: string
    columnar?: boolean
    cursor?: string
    fetch_size?: number
    field_multi_value_leniency?: boolean

    index_include_frozen?: string
    keep_alive?: Time
    keep_on_completion?: boolean
    page_timeout?: Time
    params?: (string | number)[]
    query: string
    request_timeout?: Time
    runtime_mappings?: RuntimeMappings
    time_zone?: string
    wait_for_completion_timeout?: string
}

export interface SqlSearchRequest {
    body: SqlSearchRequestBody
    queryParams?: SqlSearchRequestQueryParams
}

export interface SqlSearchResponseColumns {
    name: string
    type: string
}

export interface SqlSearchResponse {
    columns: SqlSearchResponseColumns[]
    rows: unknown[][]
    cursor: string
}