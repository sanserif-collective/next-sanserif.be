import Link from 'next/link'
import Sprite from './Sprite'

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-24 py-20">
      <Link href="/">
        <a className="inline-block">
          <Sprite id="logo" className="w-20 h-4" />
        </a>
      </Link>
      <button className="flex flex-col justify-between h-3">
        {[...Array(2)].map((_, index) => (
          <span key={index} className="h-[2px] w-6 block bg-black"></span>
        ))}
      </button>
    </header>
  )
}

export default Header
