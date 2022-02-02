import graphQLClient from "graphql-client"
import { gql } from "graphql-request"
import { Header } from "types/shared"
import type { Strapi } from "types/strapi"

type Content = {
  contact: Strapi.Data<
    Strapi.Attributes<{
      header: Header
    }>
  >
}

const getContact = () => graphQLClient.request<Content>(
  gql`
    query GetContact {
      contact {
        data {
          attributes {
            header {
              title
              subtitle
              description
            }
          }
        }
      }
    }
  `
)

export default getContact
