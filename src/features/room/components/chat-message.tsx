import { cn } from '@/lib/utils'

interface ChatMessageProps {
  index: number
}

export function ChatMessage({ index }: ChatMessageProps) {
  const isEven = index % 2 == 0

  return (
    <div className={cn('flex flex-col gap-2 rounded-md bg-gray6 px-2 py-1')}>
      <div
        className={cn('flex items-center gap-3 font-semibold leading-none', isEven ? 'text-purple3' : 'text-lightBlue')}
      >
        <span className={cn('font-inter text-xs')}>Esdras Castro</span>
        <span className="text-[10px]">10:20</span>
      </div>

      <p className="text-white3 text-[0.625rem]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, reprehenderit. Autem accusantium harum quisquam
        maxime
      </p>
    </div>
  )
}
