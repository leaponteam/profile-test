import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'x1rzw5ao',
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: true
})
