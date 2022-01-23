import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts"
import { Client as ElasticsearchClient } from '../../mod.ts'

const client = new ElasticsearchClient({
    node: 'http://localhost:9201'
})

Deno.test("index apis", async (t) => {
    const index = 'my-test-index'

    await t.step({
        name: 'create indice > PUT /my-test-index',
        fn: async () => {
            const indice = await client.indices.create({ index })

            assertEquals(indice.acknowledged, true)
            assertEquals(indice.index, index)
        }
    })

    await t.step({
        name: 're-create indice > PUT /my-test-index',
        fn: async () => {
            try {
                await client.indices.create({ index })

                assertEquals(true, false)
            } catch (err) {
                assertEquals(err.status, 400)
            }
        }
    })

    await t.step({
        name: 'get indice > GET /my-test-index',
        fn: async () => {
            const indice = await client.indices.get({ target: index })

            assertEquals(Object.hasOwn(indice, index), true)
        }
    })

    await t.step({
        name: 'indice exists > HEAD /my-test-index',
        fn: async () => {
            const exists = await client.indices.exists({ target: index })

            assertEquals(exists, true)
        }
    })

    await t.step({
        name: 'close indice > POST /my-test-index',
        fn: async () => {
            const indice = await client.indices.close({ index })

            assertEquals(indice.acknowledged, true)
        }
    })

    await t.step({
        name: 'open indice > POST /my-test-index',
        fn: async () => {
            const indice = await client.indices.open({ target: index })

            assertEquals(indice.acknowledged, true)
        }
    })

    await t.step({
        name: 'indice settings > GET /my-test-index',
        fn: async () => {
            const indice = await client.indices.settings({ target: index })

            assertEquals(Object.hasOwn(indice, index), true)
        }
    })

    await t.step({
        name: 'delete indice > DELETE /my-test-index',
        fn: async () => {
            const indice = await client.indices.delete({ index })

            assertEquals(indice.acknowledged, true)
        }
    })

    await t.step({
        name: 'indice not exists > HEAD /my-test-index',
        fn: async () => {
            const exists = await client.indices.exists({ target: index })

            assertEquals(exists, false)
        }
    })

    await t.step({
        name: 're-delete indice > DELETE /my-test-index',
        fn: async () => {
            try {
                await client.indices.delete({ index })

                assertEquals(true, false)
            } catch (err) {
                assertEquals(err.status, 404)
            }
        }
    })
})