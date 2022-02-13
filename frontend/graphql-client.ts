import { GraphQLClient } from 'graphql-request'

const graphQLClient = new GraphQLClient(process.env.STRAPI_GRAPHQL_URL as string, {
  headers: {
    authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  }
})

export default graphQLClient
