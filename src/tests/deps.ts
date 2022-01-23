export { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts"
import { Client as ElasticsearchClient } from '../../mod.ts'

export const ELASTIC_TEST_INDEX = 'my-test-index'

const client = new ElasticsearchClient({
    node: 'http://localhost:9201'
})

export { client }