import { client, assert } from './deps.ts'

Deno.test("cluster apis", async (t) => {
    await t.step({
        name: 'GET /_cluster/health',
        fn: async () => {
            const health = await client.cluster.health()

            assert(Object.hasOwn(health, 'status'))
        }
    })

    await t.step({
        name: 'GET /_cluster/settings',
        fn: async () => {
            const settings = await client.cluster.settings()

            assert(Object.hasOwn(settings, 'persistent'));
        }
    })
})