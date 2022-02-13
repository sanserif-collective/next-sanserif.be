import type { Dispatch, SetStateAction } from 'react'

export type CursorContext = {
  setHover: Dispatch<SetStateAction<boolean>>
  hover: boolean
}
