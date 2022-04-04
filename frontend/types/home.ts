import type { Strapi } from './strapi'

export type Project = {
  slug: string
  title: string
  about: Strapi.Image<'featured'>
}

export type ProjectData = Strapi.Data<Strapi.Attributes<Project>>

export type ProjectZone<P extends string> = Record<P, Project>

type OneProject = {
  __typename: string
  first: ProjectData
}

type TwoProjects = {
  __typename: string
  first: ProjectData
  second: ProjectData
}

type ThreeProjects = {
  __typename: string
  first: ProjectData
  second: ProjectData
  third: ProjectData
}

export type FeaturedProjectComponents = {
  ComponentHomeBuilderCenter: OneProject
  ComponentHomeBuilderOneTopOneBottom: TwoProjects
  ComponentHomeBuilderOneTopTwoBottom: ThreeProjects
}

type FeaturedProject<T extends keyof FeaturedProjectComponents> = {
  __typename: T
  } &
  T extends 'ComponentHomeBuilderCenter'
    ? OneProject
    : T extends 'ComponentHomeBuilderOneTopOneBottom'
    ? TwoProjects
    : T extends 'ComponentHomeBuilderOneTopTwoBottom'
    ? ThreeProjects
    : never



export type Builder = FeaturedProject<keyof FeaturedProjectComponents>[]
