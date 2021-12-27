import Rest from './rest.ts'
import { toQueryString } from './helpers/request.ts'

import type {
    CatIndicesRequest,
    CatIndicesResponse,
    CatAliasesRequest,
    CatAliasesResponse
} from './types/index.ts'

export default class Cat extends Rest {
    indices({ target = '*', queryParams = { format: 'json', pretty: true } }: CatIndicesRequest = {}): Promise<CatIndicesResponse> {
        return this.request.send(`/_cat/indices/${target}?${toQueryString(queryParams)}`)
    }

    aliases({ alias = '*', queryParams = { format: 'json', pretty: true } }: CatAliasesRequest = {}): Promise<CatAliasesResponse> {
        return this.request.send(`/_cat/aliases/${alias}?${toQueryString(queryParams)}`)
    }
}