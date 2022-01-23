import Rest from './rest.ts'
import { toQueryString } from '../helpers/mod.ts'

import type {
    CommonQueryParameters,
    Health,
    Bytes,
    Time
} from '../types.d.ts'

export default class Cat extends Rest {
    indices({ target = '*', queryParams = { format: 'json', pretty: true } }: CatIndicesRequest = {}): Promise<CatIndicesResponse> {
        return this.request.send(`/_cat/indices/${target}?${toQueryString(queryParams)}`)
    }

    aliases({ alias = '*', queryParams = { format: 'json', pretty: true } }: CatAliasesRequest = {}): Promise<CatAliasesResponse> {
        return this.request.send(`/_cat/aliases/${alias}?${toQueryString(queryParams)}`)
    }

    count({ target = '*', queryParams = { format: 'json', pretty: true } }: CatCountRequest = {}): Promise<CatCountResponse> {
        return this.request.send(`/_cat/count/${target}?${toQueryString(queryParams)}`)
    }

    allocation({ nodeId = '*', queryParams = { format: 'json', pretty: true } }: CatAllocationRequest = {}): Promise<CatAllocationResponse> {
        return this.request.send(`/_cat/allocation/${nodeId}?${toQueryString(queryParams)}`)
    }

    fielddata({ field = '*', queryParams = { format: 'json', pretty: true } }: CatFielddataRequest = {}): Promise<CatFielddataResponse> {
        return this.request.send(`/_cat/fielddata/${field}?${toQueryString(queryParams)}`)
    }
}

export interface CommonCatQueryParameters extends CommonQueryParameters {
    h?: string
    help?: boolean
    local?: boolean
    master_timeout?: Time
    s?: string
    v?: boolean
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
export interface CatCountRequest {
    target?: string
    queryParams?: CommonCatQueryParameters
}

export interface CatCount {
    epoch: string
    timestamp: string
    count: string
}

export type CatCountResponse = CatCount[]


export interface CatAllocationRequestQueryParams extends CommonCatQueryParameters {
    bytes?: Bytes
}

export interface CatAllocationRequest {
    nodeId?: string
    queryParams?: CatAllocationRequestQueryParams
}

export interface CatAllocation {
    shards: string
    'disk.indices': string
    'disk.used': string
    'disk.avail': string
    'disk.total': string
    'disk.percent': string
    host: string
    ip: string
    node: string
}

export type CatAllocationResponse = CatAllocation[]

export interface CatFielddataRequestQueryParams extends Omit<CommonCatQueryParameters, 'master_timeout'> {
    bytes?: Bytes
}

export interface CatFielddataRequest {
    field?: string
    queryParams?: CatFielddataRequestQueryParams
}

export interface CatFielddata {
    id: string
    host: string
    ip: string
    node: string
    field: string
    size: string
}

export type CatFielddataResponse = CatFielddata[]