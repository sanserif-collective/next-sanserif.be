import type { NextApiHandler } from 'next'

const exitPreview: NextApiHandler = async (_, request) => {
  try {
    request.clearPreviewData()
    return request.status(200).json({ message: 'Cookies Cleared' })
  } catch(error) {
    return request.status(500).json({ message: error })
  }
}

export default exitPreview
