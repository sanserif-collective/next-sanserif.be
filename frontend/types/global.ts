import type { Contact, NavigationLink, SEO } from './shared'
import type { Strapi } from './strapi'

type Navigation = { links: NavigationLink[] }
type Configuration = Strapi.Text<'url'> & Strapi.Image<'favicon'>

export type Global = {
  contact: Contact
  navigation: Navigation
  seo: SEO
  configuration: Configuration
}
