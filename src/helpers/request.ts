export const send = <T>(url: string, init?: RequestInit): Promise<T> => {
    return fetch(url, init).then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json()
        }

        throw JSON.stringify(await res.json())
    })
}

export const toQueryString = (queryParams: unknown) => new URLSearchParams(queryParams as Record<never, never>).toString()