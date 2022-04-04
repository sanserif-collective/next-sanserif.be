import Heading from 'components/Heading'
import Layout from 'components/Layout'
import { GetStaticProps } from 'next'
import getContact from 'queries/getContact'
import { Global } from 'types/global'
import type { Contact, Header } from 'types/shared'

type Props = {
  header: Header
  global: Global
}

export const getStaticProps: GetStaticProps<Omit<Props, 'global'>> = async () => {
  const { header } = (await getContact()).contact.data.attributes
  return { props: { header } }
}

const Contact = ({ header, global: { contact } }: Props) => {
  return (
    <Layout className="flex flex-col items-center justify-between w-screen before:h-px">
      <p>{header.description}</p>
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col">
          <Heading
            as="h1"
            size="xl"
          >
            {header.title}
          </Heading>
          <h2 className="order-first">{header.subtitle}</h2>
        </div>
        <div className="flex flex-col space-y-0.5 text-right">
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <p>{contact.place}</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
