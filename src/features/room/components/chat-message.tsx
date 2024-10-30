import { cn } from '@/lib/utils'
import { IChatMessage } from './chat'

interface ChatMessageProps {
  index: number
  data: IChatMessage
}

export function ChatMessage({ index, data }: ChatMessageProps) {
  const isEven = index % 2 == 0

  return (
    <div className={cn('flex flex-col gap-2 rounded-md bg-gray6 px-2 py-1')}>
      <div
        className={cn('flex items-center gap-3 font-semibold leading-none', isEven ? 'text-purple3' : 'text-lightBlue')}
      >
        <span className={cn('font-inter text-xs capitalize')}>{data.username}</span>
        <span className="text-[10px]">{data.time}</span>
      </div>

      <p className="text-[0.625rem] text-white3">{data.message}</p>
    </div>
  )
}
