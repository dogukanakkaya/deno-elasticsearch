export default class Request {
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
            if (['HEAD'].includes(init?.method ?? 'GET')) {
                if (res.status === 404) {
                    throw res.statusText
                } else {
                    return res.ok
                }
            }

            if (res.status >= 200 && res.status < 300) {
                return res.json()
            }

            throw JSON.stringify(await res.json())
        })
    }
}

export const toQueryString = (queryParams: unknown) => new URLSearchParams(queryParams as Record<never, never>).toString()