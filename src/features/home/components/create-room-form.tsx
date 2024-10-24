'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CustomButton } from '@/components/custom-button'
import CustomInput from '@/components/custom-input'

const createRoomFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .trim()
    .min(3, { message: 'Nome deve ter ao menos 3 caracteres' }),
})

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>

export function CreateRoomForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomFormSchema),
  })

  const hasErrors = !!errors.name?.message

  function handleSubmitFormData(data: CreateRoomFormData) {
    console.log(data)
  }

  return (
    <form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(handleSubmitFormData)}>
      <CustomInput placeholder="Seu nome" {...register('name')} errorMessage={errors.name?.message} />
      <CustomButton title="Entrar" disabled={hasErrors || isSubmitting} isLoading={isSubmitting} />
    </form>
  )
}