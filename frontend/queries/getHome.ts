import graphQLClient from 'graphql-client'
import { gql } from 'graphql-request'
import type { Builder } from 'types/home'
import type { Header, NextLink } from 'types/shared'
import type { Strapi } from 'types/strapi'

type Content = {
  home: Strapi.Data<
    Strapi.Attributes<{
      header: Header
      builder: Builder
      next: NextLink
    }>
  >
}

const getHome = () => graphQLClient.request<Content>(
  gql`
    fragment Project on Project {
      title
      slug
      about {
        featured {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
    query GetHome {
      home {
        data {
          attributes {
            header {
              title
              subtitle
              description
            }
            builder {
              __typename
              ... on ComponentHomeBuilderCenter {
                first {
                  data {
                    attributes {
                      ...Project
                    }
                  }
                }
              }
              ... on ComponentHomeBuilderOneTopOneBottom {
                first {
                  data {
                    attributes {
                      ...Project
                    }
                  }
                }
                second {
                  data {
                    attributes {
                      ...Project
                    }
                  }
                }
              }
              ... on ComponentHomeBuilderOneTopTwoBottom {
                first {
                  data {
                    attributes {
                      ...Project
                    }
                  }
                }
                second {
                  data {
                    attributes {
                      ...Project
                    }
                  }
                }
                third {
                  data {
                    attributes {
                      ...Project
                    }
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
          }
        }
      }
    }
  `
)

export default getHome
