import { client, ELASTIC_TEST_INDEX, assertEquals, assert } from './deps.ts'

Deno.test("cat apis", async (t) => {
    const index = ELASTIC_TEST_INDEX

    await t.step('indices', async (t) => {
        // create an indice for testing purposes
        await client.indices.create({ index })

        await t.step({
            name: 'GET /_cat/indices/*',
            fn: async () => {
                try {
                    const indices = await client.cat.indices()

                    assert(indices)
                } catch (_) {
                    assert(false)
                }
            }
        })

        await t.step({
            name: `GET /_cat/indices/${index}`,
            fn: async () => {
                try {
                    const indice = await client.cat.indices({ target: index })

                    assert(indice)
                } catch (_) {
                    assert(false)
                }
            }
        })

        await t.step({
            name: 'GET /_cat/indices/nonexistent-index',
            fn: async () => {
                try {
                    const indice = await client.cat.indices({ target: 'nonexistent-index' })

                    assert(indice, 'nonexistent-index cannot be exist')
                } catch (err) {
                    assertEquals(err.status, 404)
                }
            }
        })

        await t.step({
            name: `GET /_cat/indices/${index}?format=txt`,
            fn: async () => {
                try {
                    const indice = await client.cat.indices({ target: index, queryParams: { format: 'txt' } })

                    assert(typeof indice === 'string')
                } catch (err) {
                    assertEquals(err.status, 404)
                }
            }
        })

        // delete test indice
        await client.indices.delete({ index })
    })
})