import Rest from './rest.ts'
import { toQueryString } from '../helpers/mod.ts'

import type {
    Time,
    Bytes,
    Health,
    WaitForActiveShards,
    WaitForEvents
} from '../types.d.ts'

export default class Cluster extends Rest {
    health({ target = '', queryParams = {} }: ClusterHealthRequest = {}): Promise<ClusterHealthResponse> {
        return this.request.send(`/_cluster/health/${target}?${toQueryString(queryParams)}`)
    }

    settings({ queryParams = {} }: ClusterSettingsRequest = {}): Promise<ClusterSettingsResponse> {
        return this.request.send(`/_cluster/settings/?${toQueryString(queryParams)}`)
    }
}

export interface ClusterHealthRequestQueryParams {
    level?: string
    local?: boolean
    master_timeout?: Time
    timeout?: Time
    wait_for_active_shards?: WaitForActiveShards
    wait_for_events?: WaitForEvents
    wait_for_no_initializing_shards?: boolean
    wait_for_no_relocating_shards?: boolean
    wait_for_nodes?: string
    wait_for_status?: Health
}

export interface ClusterHealthRequest {
    target?: string
    queryParams?: ClusterHealthRequestQueryParams
}

export interface ClusterHealthResponse {
    cluster_name: string
    status: Health
    timed_out: boolean
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

export interface ClusterSettingsRequestQueryParams {
    flat_settings?: boolean
    include_defaults?: boolean
    master_timeout?: Time
    timeout?: Time
}

export interface ClusterSettingsRequest {
    queryParams?: ClusterSettingsRequestQueryParams
}

export interface ClusterSettingsResponse {
    persistent?: Record<string, unknown>
    transient?: Record<string, unknown>
}