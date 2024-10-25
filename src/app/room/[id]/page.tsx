'use client'

import { Chat } from '@/features/room/components/chat'
import { Footer } from '@/features/room/components/footer'

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-full w-full flex-col justify-between p-5">
      <div className="flex h-full w-full">
        <div className="h-full w-[80%]">Absurdo</div>
        <div className="h-full w-[20%]">
          <Chat />
        </div>
      </div>
      <Footer />
    </div>
  )
}
