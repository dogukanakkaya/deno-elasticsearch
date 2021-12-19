# deno-elasticsearch


## Connect and Check the Health of Elasticsearch
```ts
import { Client as ElasticsearchClient } from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'
import type { HealthResponse } from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

const client = new ElasticsearchClient({ node: 'http://localhost:9200' })

const health: HealthResponse = await client.health()
```

<br>

## Search

```ts
interface Source {
    id: number
}

const res = await client.search<Source>('airport_codes', {
    query: {
        match: {
            'AirportCode': 'SAW'
        }
    }
})
```

<br>

## Indice Methods

```ts
import type {
    CatIndicesResponse,
    IndicesFindResponse,
    IndicesCreateResponse,
    IndicesCreateBody,
    IndicesDeleteResponse,
    IndicesStatusResponse,
    IndicesSettingsFindResponse
} from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

// get indice/s
const indices: CatIndicesResponse = await client.indices.findAll()
const indice: IndicesFindResponse = await client.indices.find('test-index')

// create indice
const createIndiceBody: IndicesCreateBody = {}
const createIndice: IndicesCreateResponse = await client.indices.create('test-index', createIndiceBody)

// delete indice
const deleteIndice: IndicesDeleteResponse = await client.indices.destroy('test-index')

// check if indice exists
const indiceExists: boolean = await client.indices.exists('test-index')

// close/open indice
const closeIndice: IndicesStatusResponse = await client.indices.close('test-index')
const openIndice: IndicesStatusResponse = await client.indices.open('test-index')

// get settings of an indice
const settings: IndicesSettingsFindResponse = await client.indices.settings('test-index')
```

<br>

## Document Methods

```ts
import type {
    CreateDocumentBody
} from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

const createDocument = await client.documents.create('test-index', {
    id: 1,
    title: 'test'
})
```

<br>

## Error Handling

```ts
try {
    const res = await client.indices.find('test-index22')
} catch (err) {
    console.log(err)
}
```