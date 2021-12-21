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

### Connect with Auth

```ts
const elasticUsername = Deno.env.get('ELASTIC_USERNAME')!
const elasticPassword = Deno.env.get('ELASTIC_PASSWORD')!

const client = new ElasticsearchClient({
    node: 'https://deno-elastic.es.us-central1.gcp.cloud.es.io:9243',
    auth: {
        username: elasticUsername,
        password: elasticPassword
    }
})
```

<br>

### Search

```ts
import type { SearchResponse } from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

interface Source {
    id: number
    title: string
}

const result = await client.search<Source>('test-index', {
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

const indices = await client.indices.findAll()

const indice = await client.indices.find('test-index')

const createIndiceBody: IndicesCreateBody = {}
const createIndice = await client.indices.create('test-index', createIndiceBody)

const deleteIndice = await client.indices.delete('test-index')

const indiceExists = await client.indices.exists('test-index')

const closeIndice = await client.indices.close('test-index')

const openIndice = await client.indices.open('test-index')

const settings = await client.indices.settings('test-index')
```

<br>

### Documents

```ts
import type {
    DocumentsFindResponse,
    DocumentsIndexResponse,
    DocumentsDeleteResponse
} from 'https://deno.land/x/elasticsearch@v1.0.0/mod.ts'

const document = await client.documents.find<Source>('test-index', '1')

const createDocument = await client.documents.create('test-index', '1', {
    id: 1,
    title: 'My title'
})

const upsertDocument = await client.documents.upsert('test-index', '1', {
    id: 1,
    title: 'My new title'
})

const deleteDocument = await client.documents.upsert('test-index', '1')
```

<br>

### Error Handling

```ts
try {
    const result = await client.indices.find('test-index')
} catch (err) {
    console.log(err)
}
```
