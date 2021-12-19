import { Health } from './client.ts'

export enum IndiceStatus {
    All = 'all',
    Open = 'open',
    Closed = 'closed',
    Hidden = 'hidden',
    None = 'none'
}

/** Indices */
export interface CatIndice {
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

export interface Indice {
    [key: string]: Required<IndiceBody>
}

export interface IndiceBody {
    mappings?: unknown
    settings?: unknown
    aliases?: unknown
}

interface IndiceTimeouts {
    master_timeout?: string
    timeout?: string
}

export interface CreateIndiceQueryString extends IndiceTimeouts {
    wait_for_active_shards?: number
}

export interface DeleteIndiceQueryString extends IndiceTimeouts {
    expand_wildcards?: string
    ignore_unavailable?: boolean
}

export interface FindIndiceQueryString {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface ExistsIndiceQueryString {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
    flat_settings?: boolean
    include_defaults?: boolean
    local?: boolean
}

export interface StatusIndiceQueryString extends IndiceTimeouts {
    allow_no_indices?: boolean
    expand_wildcards?: string
    ignore_unavailable?: boolean
}