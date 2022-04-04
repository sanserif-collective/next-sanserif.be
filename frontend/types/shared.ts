import type { Strapi } from './strapi'

export type Contact = Strapi.Text<'phone' | 'email' | 'place'>
export type Header = Strapi.Text<'title' | 'subtitle' | 'description'>
export type Service = Strapi.Text<'name'> & { subservices: Strapi.Text<'name'>[] }
export type Member = Strapi.Text<'name'> & Strapi.Image<'portrait'>
export type NavigationLink = Strapi.Text<'label' | 'page'>
export type SEO = Strapi.Text<'title' | 'description'> & Strapi.Image<'thumbnail'>
export type Dictionary = Strapi.Text<'next' | 'rights'>
export type NextLink = Strapi.Text<'subtitle'> & { link: Strapi.Text<'label' | 'page'> }
