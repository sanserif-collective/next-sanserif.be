import graphQLClient from 'graphql-client'
import { gql } from 'graphql-request'
import type { Cover, Services, Team } from 'types/about'
import type { Header, Member, NextLink, Service } from 'types/shared'
import type { Strapi } from 'types/strapi'

type Content = {
  about: Strapi.Data<
    Strapi.Attributes<Cover & {
      header: Header
      services: Services
      team: Team
      next: NextLink
    }>
  >
  services: Strapi.Data<
    Strapi.Attributes<Service>[]
  >
  members: Strapi.Data<
    Strapi.Attributes<Member>[]
  >
}

const getAbout = () => graphQLClient.request<Content>(
  gql`
    query GetAbout {
      about {
        data {
          attributes {
            header {
              title
              subtitle
              description
            }
            cover {
              data {
                attributes {
                  url
                }
              }
            }
            services {
              title
            }
            team {
              title
              subtitle
              group {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            next {
              link {
                label
                page
              }
              subtitle
            }
            seo {
              title
              description
            }
          }
        }
      }
      services {
        data {
          attributes {
            name
            subservices {
              name
            }
          }
        }
      }
      members {
        data {
          attributes {
            name
            portrait {
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
  `
)

export default getAbout
