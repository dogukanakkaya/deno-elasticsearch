import {
    client,
    ELASTIC_TEST_INDEX,
    NONEXISTENT_ELASTIC_TEST_INDEX,
    assertEquals,
    assert,
    delay
} from './deps.ts'

Deno.test("cat apis", async (t) => {
    await t.step('indices', async (t) => {
        // [test_dependency]
        await client.indices.create({ index: ELASTIC_TEST_INDEX })

        await t.step({
            name: 'GET /_cat/indices/*',
            fn: async () => {
                const indices = await client.cat.indices()

                assert(indices)
            }
        })

        await t.step({
            name: `GET /_cat/indices/${ELASTIC_TEST_INDEX}`,
            fn: async () => {
                const indice = await client.cat.indices({ target: ELASTIC_TEST_INDEX })

                assert(indice)
            }
        })

        await t.step({
            name: `GET /_cat/indices/${NONEXISTENT_ELASTIC_TEST_INDEX}`,
            fn: async () => {
                try {
                    const indice = await client.cat.indices({ target: NONEXISTENT_ELASTIC_TEST_INDEX })

                    assert(indice, `${NONEXISTENT_ELASTIC_TEST_INDEX} can't be exist`)
                } catch (err) {
                    assertEquals(err.status, 404)
                }
            }
        })

        await t.step({
            name: `GET /_cat/indices/${ELASTIC_TEST_INDEX}?format=txt`,
            fn: async () => {
                const indice = await client.cat.indices({ target: ELASTIC_TEST_INDEX, queryParams: { format: 'txt' } })

                assert(typeof indice === 'string')
            }
        })

        // ![test_dependency]
        await client.indices.delete({ index: ELASTIC_TEST_INDEX })
    })

    await t.step({
        name: 'GET /_cat/aliases/*',
        fn: async () => {
            const aliases = await client.cat.aliases()

            assert(aliases)
        }
    })

    await t.step('count', async (t) => {
        // [test_dependency]
        await client.indices.create({ index: ELASTIC_TEST_INDEX })

        // expected count is 0 since no document is created
        await t.step({
            name: `GET /_cat/count/${ELASTIC_TEST_INDEX}`,
            fn: async () => {
                const catCount = await client.cat.count({ target: ELASTIC_TEST_INDEX })
                const expectedCount = '0'

                assert(catCount[0].count === expectedCount, `expecting document count of ${expectedCount} but found ${catCount[0].count}`)
            }
        })

        // [test_dependency]
        await client.documents.index({
            target: ELASTIC_TEST_INDEX,
            _id: '1',
            body: { title: 'Deno' }
        })

        // wait for documents to be indexed (when a document is stored in Elasticsearch, it is indexed and fully searchable in near real-time--within 1 second.) 
        await delay(1000)

        await t.step({
            name: 'GET /_cat/count/*',
            fn: async () => {
                const catCount = await client.cat.count()
                const expectedCount = '1'

                assert(catCount[0].count === expectedCount, `expecting document count of ${expectedCount} but found ${catCount[0].count}`)
            }
        })

        // ![test_dependency]
        await client.documents.delete({
            index: ELASTIC_TEST_INDEX,
            _id: '1'
        })
        // ![test_dependency]
        await client.indices.delete({ index: ELASTIC_TEST_INDEX })
    })

    await t.step({
        name: 'GET /_cat/allocation/*',
        fn: async () => {
            const allocation = await client.cat.allocation()

            assert(allocation)
        }
    })

    await t.step({
        name: 'GET /_cat/fielddata/*',
        fn: async () => {
            const fielddata = await client.cat.fielddata()

            assert(fielddata)
        }
    })
})