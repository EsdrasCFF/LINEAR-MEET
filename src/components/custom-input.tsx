import { ComponentProps, forwardRef, Ref } from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends ComponentProps<'input'> {
  className?: string
  errorMessage: string | null | undefined
}

function CustomInput({ className, errorMessage, ...rest }: InputProps, ref: Ref<HTMLInputElement>) {
  return (
    <div className="flex w-full flex-col">
      <input
        className={cn(
          'h-12 w-full rounded-md bg-gray6 px-5 leading-6 text-gray1 outline-none focus:ring-2 focus:ring-customPrimary',
          className
        )}
        {...rest}
        ref={ref}
      />

      {errorMessage && <p className="mt-1 text-end text-xs text-rose-500">{errorMessage}</p>}
    </div>
  )
}

export default forwardRef(CustomInput)

CustomInput.dsplayName = 'CustomInput'