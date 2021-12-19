import { send, toQueryString } from './helpers/request.ts'

import type { CreateDocumentRequest, CreateDocumentResponse } from './types/index.ts'

export default class Documents {
    #node: string

    constructor({ node }: { node: string }) {
        this.#node = node
    }

    create(target: string, body: unknown, queryParams: CreateDocumentRequest = {}): Promise<CreateDocumentResponse> {
        return send(`${this.#node}/${target}/_doc?${toQueryString(queryParams)}`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }
}