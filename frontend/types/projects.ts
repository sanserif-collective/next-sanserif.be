import type { NavigationLink } from './shared'
import type { Strapi } from "./strapi"

export type Slug = Strapi.Text<'slug'>
export type Emphasis = Strapi.Text<'emphasis'>
export type About =
  { link: NavigationLink }
  & Strapi.Text<'title' | 'description'>
  & Strapi.Image<'cover' | 'featured'>
