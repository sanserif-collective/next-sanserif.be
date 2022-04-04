import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = ({ res }: GetServerSidePropsContext) => {
  const manifest = `{
    "test": {
      "hello": "coucou"
    }
  }`

  res.setHeader('Content-Type', 'application/json')
  res.write(manifest)
  res.end()

  return { props: {} }
}


const Manifest = () => {}
export default Manifest
