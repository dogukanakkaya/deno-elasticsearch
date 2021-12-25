export const ndserialize = (array: unknown[]) => {
    let ndjson = ''

    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'string') {
            ndjson += array[i] + '\n'
        } else {
            ndjson += JSON.stringify(array[i]) + '\n'
        }
    }

    return ndjson
}