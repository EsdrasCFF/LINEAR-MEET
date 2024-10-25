import { ArrowDown, SendHorizonal } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { useRef } from 'react'

export function Chat() {
  const messageArray = Array.from({ length: 8 })

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-md bg-customSecondary px-4 py-4">
      <div className="flex max-h-[calc(100vh-280px)] flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {messageArray.map((value, index) => (
          <ChatMessage index={Number(index)} key={String(value) + '_' + String(index)} />
        ))}
      </div>

      <form className="relative flex h-12 w-full items-center rounded-sm bg-gray6 p-2">
        <input
          className="h-full w-full bg-transparent pl-2 pr-5 text-[0.625rem] text-gray2 outline-none"
          placeholder="Enviar mensagem"
        />
        <button>
          <SendHorizonal className="text-gray2" size={20} />
        </button>
      </form>
    </div>
  )
}
