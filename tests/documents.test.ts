import { client, ELASTIC_TEST_INDEX, assertEquals, assert } from './deps.ts'

Deno.test("document apis", async (t) => {
    // [test_dependency]
    await client.indices.create({ index: ELASTIC_TEST_INDEX })

    await t.step({
        name: `PUT /${ELASTIC_TEST_INDEX}/_create/1`,
        fn: async () => {
            const _id = '1'

            const document = await client.documents.index({
                target: ELASTIC_TEST_INDEX,
                _id,
                body: { title: 'Deno is great', popularity: 9.9 }
            })

            assertEquals(document.result, 'created')
            assertEquals(document._index, ELASTIC_TEST_INDEX)
            assertEquals(document._version, 1)
            assertEquals(document._id, _id)
        }
    })

    await t.step({
        name: `GET /${ELASTIC_TEST_INDEX}/_doc/1`,
        fn: async () => {
            const _id = '1'

            const document = await client.documents.get({
                index: ELASTIC_TEST_INDEX,
                _id
            })

            assert(document.found)
            assertEquals(document._index, ELASTIC_TEST_INDEX)
            assertEquals(document._id, _id)
        }
    })

    await t.step({
        name: `GET /${ELASTIC_TEST_INDEX}/_doc/9999`,
        fn: async () => {
            const _id = '9999'

            try {
                await client.documents.get({
                    index: ELASTIC_TEST_INDEX,
                    _id
                })
            } catch (err) {
                assert(!err.found)
                assertEquals(err._index, ELASTIC_TEST_INDEX)
                assertEquals(err._id, _id)
            }
        }
    })

    // ![test_dependency]
    await client.indices.delete({ index: ELASTIC_TEST_INDEX })
})