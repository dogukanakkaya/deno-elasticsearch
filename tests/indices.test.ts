import { client, ELASTIC_TEST_INDEX, assertEquals, assert } from './deps.ts'

Deno.test('index apis', async (t) => {
    const index = ELASTIC_TEST_INDEX

    await t.step({
        name: `PUT /${index}`,
        fn: async () => {
            const indice = await client.indices.create({ index })

            assertEquals(indice.acknowledged, true)
            assertEquals(indice.index, index)
        }
    })

    await t.step({
        name: `PUT /${index}`,
        fn: async () => {
            try {
                await client.indices.create({ index })

                assert(false, 'can\'t re-create an existing index')
            } catch (err) {
                assertEquals(err.status, 400)
            }
        }
    })

    await t.step({
        name: `GET /${index}`,
        fn: async () => {
            const indice = await client.indices.get({ target: index })

            assertEquals(Object.hasOwn(indice, index), true)
        }
    })

    await t.step({
        name: `HEAD /${index}`,
        fn: async () => {
            const exists = await client.indices.exists({ target: index })

            assertEquals(exists, true)
        }
    })

    await t.step({
        name: `POST /${index}/_close`,
        fn: async () => {
            const indice = await client.indices.close({ index })

            assertEquals(indice.acknowledged, true)
        }
    })

    await t.step({
        name: `POST /${index}/_open`,
        fn: async () => {
            const indice = await client.indices.open({ target: index })

            assertEquals(indice.acknowledged, true)
        }
    })

    await t.step({
        name: `GET /${index}/_settings`,
        fn: async () => {
            const indice = await client.indices.settings({ target: index })

            assertEquals(Object.hasOwn(indice, index), true)
        }
    })

    await t.step({
        name: `DELETE /${index}`,
        fn: async () => {
            const indice = await client.indices.delete({ index })

            assertEquals(indice.acknowledged, true)
        }
    })

    await t.step({
        name: `HEAD /${index}`,
        fn: async () => {
            const exists = await client.indices.exists({ target: index })

            assertEquals(exists, false)
        }
    })

    await t.step({
        name: `DELETE /${index}`,
        fn: async () => {
            try {
                await client.indices.delete({ index })

                assert(false, 'can\'t delete an index that is already deleted')
            } catch (err) {
                assertEquals(err.status, 404)
            }
        }
    })
})