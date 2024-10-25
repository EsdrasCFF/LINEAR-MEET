'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { ComponentProps, useState } from 'react'
import { IconType } from 'react-icons'

interface ControlButtonProps extends ComponentProps<'button'> {
  icon: LucideIcon | IconType
  disabledIcon: LucideIcon | IconType
}

export function ControlButton({ icon: Icon, disabledIcon: DIcon, ...rest }: ControlButtonProps) {
  const [clicked, setClicked] = useState(true)

  function onClickedButton() {
    setClicked((value) => !value)
    console.log({ clicked })
  }

  return (
    <button
      {...rest}
      className={cn('rounded-md bg-customSecondary px-3 py-2 text-white', !clicked && 'bg-red-500')}
      onClick={onClickedButton}
    >
      {clicked ? <Icon size={25} /> : <DIcon size={25} />}
    </button>
  )
}
