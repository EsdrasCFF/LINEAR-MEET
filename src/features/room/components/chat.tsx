import { ArrowDown, SendHorizonal } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { useContext, useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ChatInput from './chat-input'
import { SocketContext } from '@/contexts/socket-context'

interface ChatProps {
  roomId: string
}

export interface IChatMessage {
  roomId: string
  message: string
  username: string
  time: string
}

const chatMessageSchema = z.object({
  message: z.string().trim().min(2),
})

type ChatMessageData = z.infer<typeof chatMessageSchema>

export function Chat({ roomId }: ChatProps) {
  const messageArray = Array.from({ length: 8 })

  const { socket } = useContext(SocketContext)

  const [chat, setChat] = useState<IChatMessage[]>([])

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ChatMessageData>({
    resolver: zodResolver(chatMessageSchema),
  })

  function sendMessage(data: ChatMessageData) {
    const sendMessageToServer = {
      message: data.message,
      username: 'Esdras 10',
      roomId,
      time: new Date().toLocaleTimeString(),
    }

    socket?.emit('chat', sendMessageToServer)
    setChat((prevState) => [...prevState, sendMessageToServer])
    setValue('message', '')
  }

  useEffect(() => {
    socket?.on('chat', (data: IChatMessage) => {
      console.log('Message:', data)
      setChat((prevState) => [...prevState, data])
    })
  }, [socket])

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-md bg-customSecondary px-4 py-4">
      <div className="flex max-h-[calc(100vh-280px)] flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {chat.map((data, index) => (
          <ChatMessage index={index} key={data.time + data.username} data={data} />
        ))}
      </div>

      <form
        className="relative flex h-12 w-full items-center rounded-sm bg-gray6 p-2"
        onSubmit={handleSubmit(sendMessage)}
        method="POST"
      >
        <ChatInput hasError={false} isLoading={isSubmitting} {...register('message')} />
        <button type="submit">
          <SendHorizonal className="text-gray2" size={20} />
        </button>
      </form>
    </div>
  )
}

// parei no minuto 59 da aula 2
