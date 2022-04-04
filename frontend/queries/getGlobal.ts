import graphQLClient from 'graphql-client'
import { gql } from 'graphql-request'
import type { Global } from 'types/global'
import type { Dictionary } from "types/shared"
import type { Strapi } from "types/strapi"

type Content = {
  global: Strapi.Data<
    Strapi.Attributes<Global>
  >
  dictionary: Strapi.Data<
    Strapi.Attributes<Dictionary>
  >
}

const getGlobal = () => graphQLClient.request<Content>(
  gql`
    query GetGlobal {
      global {
        data {
          attributes {
            navigation {
              links {
                label
                page
              }
            }
            contact {
              place
              email
              phone
            }
            seo {
              title
              description
              thumbnail {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            configuration {
              url
              favicon {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
      dictionary {
        data {
          attributes {
            next
            rights
          }
        }
      }
    }
  `
)

export default getGlobal
