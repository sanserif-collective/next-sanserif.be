import CircledLink from 'components/CircledLink'
import Heading from 'components/Heading'
import Layout from 'components/Layout'
import StickyServices from 'components/StickyServices'
import TeamMembers from 'components/TeamMembers'
import type { GetStaticProps } from 'next'
import Image from 'next/image'
import getAbout from 'queries/getAbout'
import type { Services, Team } from 'types/about'
import type { Dictionary, Header, Member, NextLink, Service } from 'types/shared'
import type { Strapi } from 'types/strapi'

type Props = {
  header: Header
  cover: Strapi.ImageData
  services: Services & { items: Service[] }
  team: Team & { members: Member[] }
  next: NextLink
  dictionary: Dictionary
}

export const getStaticProps: GetStaticProps<Omit<Props, 'dictionary'>> = async () => {
  const { about, services, members } = await getAbout()

  return {
    props: {
      header: about.data.attributes.header,
      cover: about.data.attributes.cover.data.attributes,
      services: {
        title: about.data.attributes.services.title,
        items: services.data.map(({ attributes }) => attributes)
      },
      team: {
        title: about.data.attributes.team.title,
        subtitle: about.data.attributes.team.subtitle,
        members: members.data.map(({ attributes }) => attributes)
      },
      next: about.data.attributes.next
    }
  }
}

const About = ({ header, cover, services, team, next }: Props) => {
  return (
    <>
      <Layout className="flex flex-col justify-end w-screen">
        <div className="flex items-end flex-grow">
          <Heading
            size="xl"
            as="h1"
          >
            {header.title}
          </Heading>
          <Image
            className="ml-80 -mt-20 w-[calc(53vh_+_5rem)]"
            src={cover.url}
            width={540}
            height={740}
            objectFit="cover"
          />
        </div>
        <div className="flex items-center justify-between mt-16">
          <Heading
            as="h2"
            size="lg"
            variant="arrow"
          >
            {header.subtitle}
          </Heading>
          <p className="order-first max-w-lg">{header.description}</p>
        </div>
      </Layout>
      <Layout className="flex items-end">
        <Heading
          as="h2"
          size="xl"
          className="mb-36"
        >
          {services.title}
        </Heading>
        <StickyServices services={services.items} />
      </Layout>
      <Layout className="flex items-end ml-[50vh]">
        <Heading
          size="xl"
          className="mb-36"
          as="h2"
        >
          {team.title}
        </Heading>
        <Heading
          size="lg"
          variant="arrow"
          as="h3"
          className="ml-48"
        >
          {team.subtitle}
        </Heading>
        <TeamMembers members={team.members} />
      </Layout>
      <Layout className="flex items-center justify-center">
        <CircledLink
          href={next.link.page}
          subtitle={next.subtitle}
        >
          {next.link.label}
        </CircledLink>
      </Layout>
    </>
  )
}

export default About
