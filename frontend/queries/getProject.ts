import graphQLClient from 'graphql-client'
import { gql } from 'graphql-request'
import type { About, Emphasis, Slug } from 'types/projects'
import type { Strapi } from 'types/strapi'

type Path = {
  projects: Strapi.Data<
    Strapi.Attributes<Slug>[]
  >
}

type Content = {
  projects: Strapi.Data<
    Strapi.Attributes<{
      about: About
    } & Emphasis>[]
  >
}

export const getProjectPaths = () => graphQLClient.request<Path>(
  gql`
    query GetProjectPaths {
      projects {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `
)

export const getProject = (slug: string) => graphQLClient.request<Content>(
  gql`
    query GetProject($slug: String!) {
      projects(
        filters: {
          slug: {
            eq: $slug
          }
        }
      ) {
        data {
          attributes {
            title
            about {
              cover {
                data {
                  attributes {
                    url
                  }
                }
              }
              featured {
                data {
                  attributes {
                    url
                  }
                }
              }
              description
              link {
                label
                url
              }
            }
            emphasis
          }
        }
      }
    }
  `, { slug }
)
