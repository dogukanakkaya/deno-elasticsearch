import { client, ELASTIC_TEST_INDEX, assertEquals } from './deps.ts'

const index = ELASTIC_TEST_INDEX

Deno.test("document apis", async (t) => {
    await t.step({
        name: 'create indice for document',
        fn: async () => {
            const indice = await client.indices.create({ index })

            assertEquals(indice.acknowledged, true)
            assertEquals(indice.index, index)
        }
    })

    await t.step({
        name: `PUT /${index}/_create/1`,
        fn: async () => {
            const _id = '1'

            const document = await client.documents.index({
                target: index,
                _id,
                body: { title: 'Deno is great', popularity: 9.9 }
            })

            assertEquals(document.result, 'created')
            assertEquals(document._index, index)
            assertEquals(document._version, 1)
            assertEquals(document._id, _id)
        }
    })

    await t.step({
        name: `GET /${index}/_doc/1`,
        fn: async () => {
            const _id = '1'

            const document = await client.documents.get({
                index,
                _id
            })

            assertEquals(document.found, true)
            assertEquals(document._index, index)
            assertEquals(document._id, _id)
        }
    })

    await t.step({
        name: `GET /${index}/_doc/9999`,
        fn: async () => {
            const _id = '9999'

            try {
                await client.documents.get({
                    index,
                    _id
                })
            } catch (err) {
                assertEquals(err.found, false)
                assertEquals(err._index, index)
                assertEquals(err._id, _id)
            }
        }
    })

    await t.step({
        name: 'delete indice that is created for document',
        fn: async () => {
            const indice = await client.indices.delete({ index })

            assertEquals(indice.acknowledged, true)
        }
    })
})