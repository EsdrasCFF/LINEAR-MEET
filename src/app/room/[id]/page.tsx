'use client'

import { Footer } from '@/features/room/components/footer'

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-full w-full">
      {params.id}
      <Footer />
    </div>
  )
}