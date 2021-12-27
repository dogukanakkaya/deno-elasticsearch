export class Request {
    #baseUrl: string;
    #init: Headers | Record<string, unknown>

    constructor(baseUrl: string, init: Record<string, unknown> = {}) {
        this.#baseUrl = baseUrl
        this.#init = init
    }

    send<T>(url: string, init?: RequestInit): Promise<T> {
        const endpoint = this.#baseUrl.endsWith('/') || url.startsWith('/') ? this.#baseUrl.concat(url) : this.#baseUrl.concat(`/${url}`)

        return fetch(endpoint, {
            ...this.#init,
            ...init
        }).then(async (res) => {
            const contentType = res.headers.get('content-type')

            if (contentType && contentType.indexOf('application/json') !== -1) {
                if (res.status >= 200 && res.status < 300) {
                    return res.json()
                }

                throw JSON.stringify(await res.json())
            } else {
                if (res.ok) {
                    return true
                }

                throw res.statusText
            }
        })
    }
}

export const toQueryString = (queryParams: unknown) => new URLSearchParams(queryParams as Record<never, never>).toString()