import { client, ELASTIC_TEST_INDEX, assertEquals, assert } from './deps.ts'

Deno.test('index apis', async (t) => {
    await t.step({
        name: `PUT /${ELASTIC_TEST_INDEX}`,
        fn: async () => {
            const indice = await client.indices.create({ index: ELASTIC_TEST_INDEX })

            assert(indice.acknowledged)
            assertEquals(indice.index, ELASTIC_TEST_INDEX)
        }
    })

    await t.step({
        name: `PUT /${ELASTIC_TEST_INDEX}`,
        fn: async () => {
            try {
                await client.indices.create({ index: ELASTIC_TEST_INDEX })

                assert(false, 'can\'t re-create an existing index')
            } catch (err) {
                assertEquals(err.status, 400)
            }
        }
    })

    await t.step({
        name: `GET /${ELASTIC_TEST_INDEX}`,
        fn: async () => {
            const indice = await client.indices.get({ target: ELASTIC_TEST_INDEX })

            assert(Object.hasOwn(indice, ELASTIC_TEST_INDEX))
        }
    })

    await t.step({
        name: `HEAD /${ELASTIC_TEST_INDEX}`,
        fn: async () => {
            const exists = await client.indices.exists({ target: ELASTIC_TEST_INDEX })

            assert(exists)
        }
    })

    await t.step({
        name: `POST /${ELASTIC_TEST_INDEX}/_close`,
        fn: async () => {
            const indice = await client.indices.close({ index: ELASTIC_TEST_INDEX })

            assert(indice.acknowledged)
        }
    })

    await t.step({
        name: `POST /${ELASTIC_TEST_INDEX}/_open`,
        fn: async () => {
            const indice = await client.indices.open({ target: ELASTIC_TEST_INDEX })

            assert(indice.acknowledged)
        }
    })

    await t.step({
        name: `GET /${ELASTIC_TEST_INDEX}/_settings`,
        fn: async () => {
            const indice = await client.indices.settings({ target: ELASTIC_TEST_INDEX })

            assert(Object.hasOwn(indice, ELASTIC_TEST_INDEX))
        }
    })

    await t.step({
        name: `DELETE /${ELASTIC_TEST_INDEX}`,
        fn: async () => {
            const indice = await client.indices.delete({ index: ELASTIC_TEST_INDEX })

            assert(indice.acknowledged)
        }
    })

    await t.step({
        name: `HEAD /${ELASTIC_TEST_INDEX}`,
        fn: async () => {
            const exists = await client.indices.exists({ target: ELASTIC_TEST_INDEX })

            assert(!exists, 'deleted indice can\'t be exists')
        }
    })

    await t.step({
        name: `DELETE /${ELASTIC_TEST_INDEX}`,
        fn: async () => {
            try {
                await client.indices.delete({ index: ELASTIC_TEST_INDEX })

                assert(false, 'can\'t delete an index that is already deleted')
            } catch (err) {
                assertEquals(err.status, 404)
            }
        }
    })
})