import {
    Health,
    Bytes,
    Time
} from './index.ts'

export interface CommonCatQueryParameters {
    format?: string
    h?: string
    help?: boolean
    local?: boolean
    master_timeout?: Time
    s?: string
    v?: boolean
    pretty?: boolean
}

export interface CatIndice {
    health: Health
    status: string
    index: string
    uuid: string
    pri: number
    rep: number
    'docs.count'?: number
    'docs.deleted'?: number
    'store.size'?: string
    'pri.store.size'?: string
}

export interface CatIndicesRequestQueryParams extends CommonCatQueryParameters {
    bytes?: Bytes
    expand_wildcards?: string
    health?: Health
    include_unloaded_segments?: boolean
    pri?: boolean
}

export interface CatIndicesRequest {
    target?: string
    queryParams?: CatIndicesRequestQueryParams
}

export type CatIndicesResponse = CatIndice[]

export interface CatAliasesRequestQueryParams extends CommonCatQueryParameters {
    expand_wildcards?: string
}

export interface CatAliasesRequest {
    alias?: string
    queryParams?: CatAliasesRequestQueryParams
}

export interface CatAlias {
    alias: string
    index: string
    filter: string
    is_write_index: string
    'routing.index': string
    'routing.search': number
}

export type CatAliasesResponse = CatAlias[]