import { Loader2 } from 'lucide-react'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ComponentProps<'button'> {
  className?: string
  title: string
  disabled: boolean
  isLoading?: boolean
}

export function CustomButton({ title, className, disabled, isLoading = false, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'flex h-12 w-full items-center justify-center rounded-md bg-customPrimary font-semibold leading-none text-black3 transition-opacity hover:opacity-80',
        disabled && 'cursor-default bg-opacity-70 hover:opacity-100',
        className
      )}
    >
      {title} {isLoading && <Loader2 className="ml-2 animate-spin" />}
    </button>
  )
}