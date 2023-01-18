<p align="center">
  <img src="https://user-images.githubusercontent.com/51231605/146690618-716a20dd-c3cd-4b30-a106-03108eb20cb0.png"/>
  <h3 align="center">Elasticsearch Client for Deno Runtime</h3>
</p>

<br>

# Getting Started

### Connect

```ts
import { Client as ElasticsearchClient } from "https://deno.land/x/elasticsearch@v8.6.0/mod.ts";

const client = new ElasticsearchClient({
  node: "http://localhost:9200",
  /*
    auth: {
        username: 'elastic',
        password: 'password'
        // or use apiKey
        apiKey: 'apiKey'
    }
    */
});
```

<br>

### Search APIs

```ts
import type { SearchResponse } from "https://deno.land/x/elasticsearch@v8.6.0/mod.ts";

interface Source {
  title: string;
}

const res: SearchResponse<Source> = await client.search<Source>({
  target: "test-index",
  body: {
    query: {
      match_all: {},
    },
  },
});

const mres: MSearchResponse<Source> = await client.msearch<{ title: string }>({
  // target: 'test-index',
  body: [
    { index: "test-index" },
    { query: { match: { title: "Deno" } } },
    { index: "test-index" },
    { query: { match: { title: "Node" } } },
    { index: "other-test-index" },
    { query: { match: { title: "Rust" } } },
  ],
});

// msearch will not throw an error on not found like search does
// so you have to check if each response has object `hits` or `error`
mres.responses.forEach((m) => {
  if ("hits" in m) {
    console.log(m.status);
  } else if ("error" in m) {
    console.log(m.error.root_cause[0].reason);
  }
});
```

<br>

### SQL Search API

```ts
import type { SqlSearchResponse } from "https://deno.land/x/elasticsearch@v8.6.0/mod.ts";

const res: SqlSearchResponse = await client.sql.search({
  body: {
    query: "SELECT * FROM test_index",
  },
  queryParams: {},
});

res.rows.forEach((row) => {
  console.log(row);
});

const resAsync = await client.sql.getAsyncSearch({
  searchId:
    "FjdMX1JpMUFOVGVpOHJfUmJtcXdnLXcbZjBQdkR2bUNTUkNRdmR2Z0NJSWdIQToxMzgx",
  queryParams: {},
});
```

<br>

### Cluster APIs

```ts
const health = await client.cluster.health({
  target: "",
  queryParams: {},
});

const settings = await client.cluster.settings({
  queryParams: {},
});
```

<br>

### Cat APIs

```ts
const indices = await client.cat.indices({
  target: "*",
  queryParams: {},
});

const aliases = await client.cat.aliases({
  alias: "*",
  queryParams: {},
});

const count = await client.cat.count({
  target: "*",
  queryParams: {},
});

const allocation = await client.cat.allocation({
  nodeId: "*",
  queryParams: {},
});

const fielddata = await client.cat.fielddata({
  field: "*",
  queryParams: {},
});
```

<br>

### Index APIs

```ts
const indices = await client.indices.get({
  target: "*",
  queryParams: {},
});

const indice = await client.indices.get({
  target: "test-index",
  queryParams: {},
});

await client.indices.create({
  index: "test-index",
  body: {},
  queryParams: {},
});

await client.indices.delete({
  index: "test-index",
  queryParams: {},
});

const exists = await client.indices.exists({
  target: "test-index",
  queryParams: {},
});

await client.indices.close({
  index: "test-index",
  queryParams: {},
});

await client.indices.open({
  target: "test-index",
  queryParams: {},
});

const settings = await client.indices.settings({
  target: "test-index",
  setting: "",
  queryParams: {},
});

await client.indices.clone({
  index: "test-index",
  targetIndex: "cloned-test-index",
  body: {},
  queryParams: {},
});

await client.indices.refresh({
  target: "test-index",
  queryParams: {},
});
```

<br>

### Document APIs

```ts
const doc = await client.documents.get<Source>({
  index: "test-index",
  _id: "1",
  queryParams: {},
});

const docs = await client.documents.mget<Source>({
  // index: 'test-index',
  body: {
    docs: [
      {
        _id: "1",
        _index: "test-index",
      },
      {
        _id: "2",
        _index: "test-index",
      },
    ],
  },
  queryParams: {},
});

await client.documents.index({
  target: "test-index",
  _id: "1",
  body: { title: "Node" },
  queryParams: {},
});

await client.documents.upsert({
  target: "test-index",
  _id: "1",
  body: { title: "Deno" },
  queryParams: {},
});

await client.documents.delete({
  index: "test-index",
  _id: "1",
  queryParams: {},
});

await client.documents.bulk({
  // target: 'test-index',
  body: [
    { index: { _index: "test-index", _id: "2" } },
    { title: "Node is great" },
    { index: { _index: "test-index", _id: "3" } },
    { title: "Deno is also great" },
    { update: { _id: "3", _index: "test-index" } },
    { doc: { title: "Deno is much better than node" } },
  ],
  queryParams: {},
});

const exists = await client.documents.exists({
  index: "test-index",
  _id: "1",
  queryParams: {},
});
```

<br>

### Notes

If you get a promise to an error responses, wrap your code within try catch:

```
error: Uncaught (in promise) #<Object>
```

<br>

## Docker

Start an Elasticsearch 8 Container

```
docker run -p 9200:9200 --name deno-elasticsearch -e "discovery.type=single-node" -d -it docker.elastic.co/elasticsearch/elasticsearch:8.6.0
```

Reset the password for `elastic` user

```
docker exec -it deno-elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

Copy the Security Certificate from Docker Container to Your Local Machine

```
docker cp deno-elasticsearch:/usr/share/elasticsearch/config/certs/http_ca.crt .
```

Run Application with Certificate (remember to connect client with auth object)

```
deno run --allow-net --cert http_ca.crt app.ts
```

<br>

## Tests

> Don't forget to change password for elastic user in `tests/deps.ts`

```
deno test tests --allow-net --cert http_ca.crt
```
