import Rest from './rest.ts'
import { toQueryString } from '../helpers/mod.ts'

import type {
    Health,
    Bytes,
    Time
} from './types.d.ts'

export default class Cat extends Rest {
    indices({ target = '*', queryParams = { format: 'json', pretty: true } }: CatIndicesRequest = {}): Promise<CatIndicesResponse> {
        return this.request.send(`/_cat/indices/${target}?${toQueryString(queryParams)}`)
    }

    aliases({ alias = '*', queryParams = { format: 'json', pretty: true } }: CatAliasesRequest = {}): Promise<CatAliasesResponse> {
        return this.request.send(`/_cat/aliases/${alias}?${toQueryString(queryParams)}`)
    }
}

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