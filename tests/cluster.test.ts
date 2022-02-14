import { client, assertEquals } from './deps.ts'

Deno.test("cluster apis", async (t) => {
    await t.step({
        name: 'GET /_cluster/health',
        fn: async () => {
            const health = await client.cluster.health()

            assertEquals(Object.hasOwn(health, 'status'), true)
        }
    })
})