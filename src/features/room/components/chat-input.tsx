'use client'

import { ComponentProps, Ref, forwardRef } from 'react'

interface ChatInputProps extends ComponentProps<'input'> {
  hasError: boolean
  isLoading: boolean
}

function ChatInput({ hasError, isLoading, ...rest }: ChatInputProps, ref: Ref<HTMLInputElement>) {
  return (
    <input
      className="h-full w-full bg-transparent pl-2 pr-5 text-[0.625rem] text-gray2 outline-none"
      placeholder="Enviar mensagem"
      ref={ref}
      disabled={hasError || isLoading}
      {...rest}
    />
  )
}

export default forwardRef(ChatInput)

ChatInput.dsplayName = 'ChatInput'
