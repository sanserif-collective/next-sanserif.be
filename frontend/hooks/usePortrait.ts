import { useMediaQuery } from 'react-responsive'

const usePortrait = () => useMediaQuery({ query: '(orientation: portrait)' })
export default usePortrait
