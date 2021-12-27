import Rest from './rest.ts'
import { toQueryString } from './helpers/request.ts'

import {
    ClusterHealthRequest,
    ClusterHealthResponse
} from './types/index.ts'

export default class Cluster extends Rest {
    health({ target = '', queryParams = {} }: ClusterHealthRequest = {}): Promise<ClusterHealthResponse> {
        return this.request.send(`/_cluster/health/${target}?${toQueryString(queryParams)}`)
    }
}