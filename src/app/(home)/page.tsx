'use client'

import { useState } from 'react'

import { CreateRoomForm } from '@/features/home/components/create-room-form'
import { JoinRoomForm } from '@/features/home/components/join-room-form'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [joinRoom, setJoinRoom] = useState(true)

  function handleJoinRoomButtonClick() {
    setJoinRoom((value) => !value)
  }

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-xl flex-col overflow-hidden rounded-b-md">
        <div className="flex w-full text-lg leading-none">
          <button
            className={cn(
              'w-full rounded-t-md py-3',
              joinRoom ? 'bg-customSecondary text-customPrimary' : 'bg-customBackground p-2 text-white'
            )}
            onClick={handleJoinRoomButtonClick}
          >
            Ingressar
          </button>
          <button
            className={cn(
              'text-customPrimarya w-full rounded-t-md bg-customSecondary p-3',
              joinRoom ? 'bg-customBackground text-white' : 'bg-customSecondary text-customPrimary'
            )}
            onClick={handleJoinRoomButtonClick}
          >
            Nova Reunião
          </button>
        </div>
        <div className="flex w-full flex-col rounded-b-md bg-customSecondary p-12">
          {joinRoom ? <JoinRoomForm /> : <CreateRoomForm />}
        </div>
      </div>
    </main>
  )
}