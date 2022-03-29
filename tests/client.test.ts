import { client, ELASTIC_TEST_INDEX, assertEquals, assert, delay } from './deps.ts'

Deno.test("search apis", async (t) => {
    // [test_dependency]
    await client.indices.create({ index: ELASTIC_TEST_INDEX })
    await client.documents.index({
        target: ELASTIC_TEST_INDEX,
        _id: '1',
        body: { title: 'Deno is great', popularity: 9.9 }
    })
    await client.documents.index({
        target: ELASTIC_TEST_INDEX,
        _id: '2',
        body: { title: 'Node is also great', popularity: 10.0 }
    })

    // wait for documents to be indexed (when a document is stored in Elasticsearch, it is indexed and fully searchable in near real-time--within 1 second.) 
    await delay(1000)

    await t.step({
        name: `POST /${ELASTIC_TEST_INDEX}/_search`,
        fn: async () => {
            const result = await client.search<{ title: string, popularity: number }>({
                target: ELASTIC_TEST_INDEX,
                body: {
                    query: {
                        match_all: {}
                    }
                }
            })

            assertEquals(result.hits.total.value, 2)
            assertEquals(result.hits.hits[0]._source.title, 'Deno is great')
        }
    })

    await t.step({
        name: `POST /${ELASTIC_TEST_INDEX}/_search`,
        fn: async () => {
            const result = await client.search<{ title: string, popularity: number }>({
                target: ELASTIC_TEST_INDEX,
                body: {
                    query: {
                        match: {
                            title: 'Node'
                        }
                    }
                }
            })

            assertEquals(result.hits.total.value, 1)
            assertEquals(result.hits.hits[0]._source.popularity, 10.0)
        }
    })

    await t.step({
        name: `POST /${ELASTIC_TEST_INDEX}/_msearch`,
        fn: async () => {
            const result = await client.msearch<{ title: string, popularity: number }>({
                body: [
                    { index: ELASTIC_TEST_INDEX },
                    { query: { match: { title: 'Deno' } } },
                    { index: ELASTIC_TEST_INDEX },
                    { query: { match: { title: 'Node' } } },
                    { index: ELASTIC_TEST_INDEX },
                    { query: { match: { title: 'Rust' } } },
                    { index: 'non-existent-index' },
                    { query: { match: { title: 'V8' } } },
                ]
            })

            const existingResponses = result.responses.filter(res => 'hits' in res && res.hits.total.value > 0)
            const errorResponses = result.responses.filter(res => 'error' in res)

            assertEquals(existingResponses.length, 2)
            assertEquals(errorResponses.length, 1)
        }
    })

    // ![test_dependency]
    await client.documents.delete({
        index: ELASTIC_TEST_INDEX,
        _id: '1'
    })
    await client.documents.delete({
        index: ELASTIC_TEST_INDEX,
        _id: '2'
    })
    await client.indices.delete({ index: ELASTIC_TEST_INDEX })
})