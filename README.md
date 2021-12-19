<p align="center">
  <img src="https://user-images.githubusercontent.com/51231605/146690618-716a20dd-c3cd-4b30-a106-03108eb20cb0.png"/>

  <h3 align="center">Elasticsearch Client for Deno Runtime</p>
</p>

<br>

# Getting Started

### Connect and Check the Health of Elasticsearch
```ts
import { Client as ElasticsearchClient } from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'
import type { HealthResponse } from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

const client = new ElasticsearchClient({ node: 'http://localhost:9200' })

const health: HealthResponse = await client.health()
```

<br>

### Search

```ts
import type { SearchResponse } from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

interface Source {
    id: number
    title: string
    description: string
}

const res: SearchResponse<Source> = await client.search<Source>('airport_codes', {
    query: {
        match: {
            title: 'Deno'
        }
    }
})
```

<br>

### Indices

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

### Documents

```ts
import type {
    CreateDocumentResponse
} from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

const createDocument: CreateDocumentResponse = await client.documents.create('test-index', {
    id: 1,
    title: 'test'
})
```

<br>

### Error Handling

```ts
try {
    const res = await client.indices.find('test-index22')
} catch (err) {
    console.log(err)
}
```
