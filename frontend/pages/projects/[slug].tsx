import { GetStaticPaths, GetStaticProps } from 'next'
import { getProject, getProjectPaths } from 'queries/getProject'
import type { About, Emphasis, Slug } from 'types/projects'

type Props = {
  about: About
} & Emphasis

export const getStaticPaths: GetStaticPaths<Slug> = async () => {
  const { projects } = await getProjectPaths()

  return {
    fallback: false,
    paths: projects.data.map(
      ({ attributes }) => ({ params: { slug: attributes.slug } })
    )
  }
}

export const getStaticProps: GetStaticProps<Props, Slug> = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true
    }
  }

  const [project] = (await getProject(params?.slug)).projects.data

  return {
    props: {
      project: project.attributes
    }
  }
}

const Project = ({ about, emphasis }: Props) => {
  return (
    <div>
      hello
    </div>
  )
}

export default Project
