import clsx from 'clsx'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import { Contact, NavigationLink } from 'types/shared'
import Heading from './Heading'

type Props = Contact & {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
  links: NavigationLink[]
  rights: string
  children: ReactNode
}

const Header = ({ open, links, rights, place, phone, email, children, setOpen }: Props) => {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  const menu = useRef<HTMLDivElement>(null)
  const center = useRef<HTMLAnchorElement[]>([])
  const bottom = useRef<HTMLSpanElement[]>([])

  const reveal = useRef<gsap.core.Timeline>()
  const marquees = useRef<gsap.core.Tween[]>([])

  const accentSet = gsap.quickSetter(document.body, '--accent-color')

  const setWhite = () => !reveal.current?.reversed() && accentSet('#fff')
  const setBlack = () => reveal.current?.reversed() && accentSet('#000')

  const showMenu = () => {
    reveal.current?.play().add(setWhite, 1)
    marquees.current.forEach(
      marquee => marquee.play()
    )
  }

  const hideMenu = () => { reveal.current?.reverse().add(setBlack, 1.5) }

  const onPageChange = () => {
    setOpen(false)
    hideMenu()
  }

  useEffect(() => {
    accentSet('#000')

    reveal.current = gsap.timeline({ paused: true })
      .from(menu.current, {
        id: 'shutter',
        yPercent: 100,
        duration: 2,
        ease: 'power4.inOut',
      })
      .from(center.current, {
        yPercent: 100,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.75')
      .from(bottom.current, {
        yPercent: 100,
        stagger: 0.05,
        duration: 0.25
      }, '-=0.1')

    marquees.current = center.current.map((link, index) => {
      return gsap.to(link.childNodes, {
        xPercent: index % 2 === 0 ? -100 : 100,
        repeat: -1,
        duration: 5,
        ease: 'none',
        paused: true
      })
    })

    router.events.on('routeChangeComplete', onPageChange)

    return () => {
      reveal.current?.kill()
      marquees.current.forEach(marquee => marquee.kill())
      router.events.off('routeChangeComplete', onPageChange)
    }
  }, [])

  useEffect(() => setMounted(true), [])
  useEffect(() => open ? showMenu() : hideMenu(), [open])

  return (
    <>
      <header
        ref={menu}
        className={clsx(
          'fixed z-10 inset-0 origin-bottom w-screen h-screen px-24 py-[10vh]',
          'flex flex-col items-center justify-between',
          'text-white bg-black before:h-px',
          'md:px-[4vw]',
          mounted ? 'visible' : 'invisible',
        )}
      >
        <nav className="w-full max-w-xl overflow-hidden sm:max-w-none">
          <ul>
            {links.map(({ label, page }, index) => (
              <li
                key={page}
                className="overflow-hidden"
              >
                <Link href={page === 'home' ? '/' : page}>
                  <a
                    className="flex justify-center transition-opacity opacity-50 hover:opacity-100"
                    ref={element => center.current[index] = element!}
                    onMouseEnter={() => marquees.current[index]?.pause()}
                    onMouseLeave={() => marquees.current[index]?.play()}
                  >
                    {[...Array(10)].map((_, index) => (
                      <Heading
                        key={index}
                        className={clsx(
                          '!uppercase flex items-center pl-5',
                          'after:h-4 after:w-4 after:bg-white after:block after:ml-5 after:rounded-full'
                        )}
                      >
                        {label}
                      </Heading>
                    ))}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={clsx(
          'flex items-end justify-between w-full',
          'sm:flex-col sm:items-center sm:space-y-4'
        )}>
          <p className="overflow-hidden">
            <span
              ref={element => bottom.current[0] = element!}
              className="block"
            >
              {place}
            </span>
          </p>
          <div className="text-center">
            <a
              className="block overflow-hidden"
              href={`tel:${phone}`}
            >
              <span
                ref={element => bottom.current[1] = element!}
                className="block"
              >
                {phone}
              </span>
            </a>
            <a
              className="overflow-hidden"
              href={`mailto:${email}`}
            >
              <span
                ref={element => bottom.current[2] = element!}
                className="block"
              >
                {email}
              </span>
            </a>
          </div>
          <p className="overflow-hidden">
            <span
              ref={element => bottom.current[3] = element!}
              className="block"
            >
              {rights}
            </span>
          </p>
        </div>
      </header>
      {children}
    </>
  )
}

export default Header
