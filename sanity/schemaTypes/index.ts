import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { start } from 'node:repl'
import { startup } from './startup'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup],
}
