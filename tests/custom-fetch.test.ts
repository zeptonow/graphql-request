import { GraphQLClient } from '../src/index.js'
import { setupMockServer } from './__helpers.js'
import fetch from 'cross-fetch'
import { expect, test } from 'vitest'

const ctx = setupMockServer()

test(`with custom fetch`, async () => {
  let touched = false
  // wrap fetch in a custom method
  const customFetch = function (input: RequestInfo, init?: RequestInit) {
    touched = true
    return fetch(input, init)
  }
  const client = new GraphQLClient(ctx.url, { fetch: customFetch })
  const mock = ctx.res()
  await client.request(`{ me { id } }`)
  expect(touched).toEqual(true)
})
