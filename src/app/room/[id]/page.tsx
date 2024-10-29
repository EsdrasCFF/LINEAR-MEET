'use client'

import { Chat } from '@/features/room/components/chat'
import { Footer } from '@/features/room/components/footer'

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-[calc(100%-4rem)] w-full flex-col justify-between gap-5 p-5">
      <div className="flex h-[calc(100vh-188px)] w-full gap-5">
        <div className="flex h-full w-full flex-col gap-5 overflow-y-auto sm:grid sm:w-[60%] sm:grid-cols-1 md:w-[80%] md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-auto w-full" />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-auto w-full" />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-auto w-full" />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-auto w-full" />
          </div>
        </div>
        <div className="hidden h-full w-[20%] sm:flex sm:w-[40%] md:w-[20%]">
          <Chat />
        </div>
      </div>
      <Footer />
    </div>
  )
}
