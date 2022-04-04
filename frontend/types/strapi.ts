export namespace Strapi {
  export type Data<D> = { data: D }
  export type Attributes<A> = { attributes: A }
  export type Text<Name extends string> = Record<Name, string>
  export type ImageData = {
    url: string
    name: string
    alternativeText: string
    width: number
    height: number
  }
  export type Image<Name extends string> = Record<Name, Data<Attributes<ImageData>>>
}
