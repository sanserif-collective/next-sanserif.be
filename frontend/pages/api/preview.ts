import type { NextApiHandler } from 'next'

const preview: NextApiHandler = async (request, response) => {
  const { slug } = request.query
  response.setPreviewData({})
  response.redirect(307, slug as string)
}

export default preview
