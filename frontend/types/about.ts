import { Strapi } from './strapi'

export type Cover = Strapi.Image<'cover'>
export type Services = Strapi.Text<'title'>
export type Team = Strapi.Text<'title' | 'subtitle'>
