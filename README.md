<p align="center">
  <img src="https://user-images.githubusercontent.com/51231605/146690618-716a20dd-c3cd-4b30-a106-03108eb20cb0.png"/>

  <h3 align="center">Elasticsearch Client for Deno Runtime</p>
</p>

<br>

# Getting Started

### Connect and Check the Health of Elasticsearch

```ts
import { Client as ElasticsearchClient } from 'https://deno.land/x/elasticsearch@v7.16.0/mod.ts'
import type { HealthResponse } from 'https://deno.land/x/elasticsearch@v7.16.0/mod.ts'

const client = new ElasticsearchClient({ node: 'http://localhost:9200' })

const health: HealthResponse = await client.health()
```

<br>

### Connect with Auth

```ts
const username = Deno.env.get('ELASTIC_USERNAME')!
const password = Deno.env.get('ELASTIC_PASSWORD')!

const client = new ElasticsearchClient({
    node: 'https://deno-elastic.es.us-central1.gcp.cloud.es.io:9243',
    auth: {
        username,
        password
    }
})
```

<br>

### Search

```ts
import type { SearchResponse } from 'https://deno.land/x/elasticsearch@v7.16.0/mod.ts'

interface Source {
    title: string
}

const res = await client.search<Source>({
    target: 'test-index',
    body: {
        query: {
            match_all: {}
        }
    }
})
```

<br>

### Indices

```ts
const indices = await client.indices.getAll({
    queryParams: {
        health: 'yellow'
    }
})

const indice = await client.indices.get({
    target: 'test-index',
    queryParams: {}
})

await client.indices.create({
    index: 'test-index',
    body: {},
    queryParams: {}
})

await client.indices.delete({
    index: 'test-index',
    queryParams: {}
})

const exists = await client.indices.exists({
    target: 'test-index',
    queryParams: {}
})

await client.indices.close({
    index: 'test-index',
    queryParams: {}
})

await client.indices.open({
    target: 'test-index',
    queryParams: {}
})

const settings = await client.indices.settings({
    target: 'test-index',
    setting: '',
    queryParams: {}
})
```

<br>

### Documents

```ts
const doc = await client.documents.get<Source>({
    index: 'test-index',
    _id: '1'
})

const docs = await client.documents.mget<Source>({
    // index: 'test-index',
    body: {
        docs: [
            {
                _id: '1',
                _index: 'test-index'
            },
            {
                _id: '2',
                _index: 'test-index'
            }
        ]
    }
})

await client.documents.index({
    target: 'test-index',
    _id: '1',
    body: { title: 'Node' }
})

await client.documents.upsert({
    target: 'test-index',
    _id: '1',
    body: { title: 'Deno' }
})

await client.documents.delete({
    index: 'test-index',
    _id: '1'
})

await client.documents.bulk({
    // target: 'test-index',
    body: [
        { index: { _index: 'test-index2', _id: '2', } },
        { title: 'Node is great' },
        { index: { _index: 'test-index2', _id: '3', } },
        { title: 'Deno is also great' },
        { update: { _id: '3', _index: "test-index2" } },
        { doc: { title: 'Deno is much better than node' } }
    ]
})

const exists = await client.documents.exists({
    index: 'test-index',
    _id: '1'
})
```
