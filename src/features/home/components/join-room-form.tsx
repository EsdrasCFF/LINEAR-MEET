import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CustomButton } from '@/components/custom-button'
import CustomInput from '@/components/custom-input'

const joinRoomFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .trim()
    .min(3, { message: 'Nome deve ter ao menos 3 caracteres' }),
  roomId: z
    .string({ required_error: 'Room Id é obrigatório para acessar a reunião!' })
    .trim()
    .min(9, { message: 'Código inválido, informe um ID válido!' }),
})

type JoinRoomFormData = z.infer<typeof joinRoomFormSchema>

export function JoinRoomForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<JoinRoomFormData>({
    resolver: zodResolver(joinRoomFormSchema),
  })

  const hasErrors = !!errors.name?.message || !!errors.roomId?.message

  function handleSubmitFormData(data: JoinRoomFormData) {
    console.log(data)
  }

  return (
    <form className="flex w-full flex-col gap-10" onSubmit={handleSubmit(handleSubmitFormData)}>
      <CustomInput placeholder="Seu nome" {...register('name')} errorMessage={errors.name?.message} />
      <CustomInput placeholder="ID da reunião" {...register('roomId')} errorMessage={errors.roomId?.message} />
      <CustomButton title="Entrar" disabled={hasErrors || isSubmitting} isLoading={isSubmitting} />
    </form>
  )
}