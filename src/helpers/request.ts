export class Request {
    #baseUrl: string;
    #init: Headers | Record<string, unknown>

    constructor(baseUrl: string, init: Record<string, unknown> = {}) {
        this.#baseUrl = baseUrl
        this.#init = init
    }

    send<T>(url: string, init?: RequestInit): Promise<T> {
        const endpoint = this.#baseUrl.endsWith('/') || url.#baseUrl.startsWith('/') ? this.#baseUrl.concat(url) : this.#baseUrl.concat(`/${url}`)

        return fetch(endpoint, {
            ...this.#init,
            ...init
        }).then(async res => {
            const contentType = res.headers.get('content-type')

            if (contentType?.indexOf('application/json') !== -1) {
                try {
                    if (res.status >= 200 && res.status < 300) {
                        return await res.json()
                    }
                } catch (_) {
                    // if content-type is json but the response data is not json
                    // just return if the response is ok or not
                    return res.ok
                }

                throw await res.json()
            } else {
                if (res.ok) {
                    return await res.text()
                }

                throw await res.text()
            }
        })
    }
}

export const toQueryString = (queryParams: unknown) => new URLSearchParams(queryParams as Record<never, never>).toString()
