'use client'

import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'

interface ControlButtonProps extends ComponentProps<'button'> {
  icon: LucideIcon
}

export function ControlButton({ icon: Icon, ...rest }: ControlButtonProps) {
  return (
    <button
      {...rest}
      className="items-center justify-center overflow-hidden rounded-md bg-customSecondary p-2 text-white"
    >
      <Icon size={25} />
    </button>
  )
}