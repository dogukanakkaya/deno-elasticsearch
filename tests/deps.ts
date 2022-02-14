export { assertEquals, assert } from "https://deno.land/std@0.125.0/testing/asserts.ts"
import { Client as ElasticsearchClient } from '../mod.ts'

export const ELASTIC_TEST_INDEX = 'my-test-index'

const client = new ElasticsearchClient({
    node: 'https://localhost:9201',
    auth: {
        username: 'elastic',
        password: 'w42us_g85YbLE8zwo=4E'
    }
})

export { client }