# deno-elasticsearch

```ts
import { Client as ElasticsearchClient } from 'https://deno.land/x/elasticsearch@v0.1.0/mod.ts'

const client = new ElasticsearchClient('http://localhost:9200')

await client.health()

await client.indices.findAll()
await client.indices.find('test-index')
await client.indices.create('test-index')
await client.indices.destroy('test-index')
await client.indices.exists('test-index')
await client.indices.close('test-index')
await client.indices.open('test-index')


const res = await client.search('airport_codes', {
    query: {
        match: {
            'AirportCode': 'SAW'
        }
    }
})
console.log(JSON.stringify(res, null, 2))


try {
    const res = await client.indices.find('test-index22')
    console.log(res)
} catch (err) {
    console.log(err)
}
```