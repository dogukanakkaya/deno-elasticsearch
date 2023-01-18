export { assertEquals, assert } from 'https://deno.land/std@0.173.0/testing/asserts.ts'
export { delay } from 'https://deno.land/std@0.173.0/async/delay.ts'
import { Client as ElasticsearchClient } from '../mod.ts'

export const ELASTIC_TEST_INDEX = 'my-test-index'
export const NONEXISTENT_ELASTIC_TEST_INDEX = 'nonexistent-index'

const client = new ElasticsearchClient({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'password'
    }
})

export { client }