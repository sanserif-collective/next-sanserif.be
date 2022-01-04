import { GraphQLClient } from 'graphql-request'

const graphQLClient = new GraphQLClient(process.env.STRAPI_GRAPHQL_URL as string)
export default graphQLClient
