'use client'

import { Chat } from '@/features/room/components/chat'
import { Footer } from '@/features/room/components/footer'
import { Video } from '@/features/room/components/video'

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-5 p-5">
      <div className="flex h-full w-full gap-5">
        <div className="flex h-full w-[80%] gap-5 sm:grid sm:grid-cols-2">
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
        <div className="h-full w-[20%]">
          <Chat />
        </div>
      </div>
      <Footer />
    </div>
  )
}
