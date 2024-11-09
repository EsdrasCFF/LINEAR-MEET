'use client'

import { SocketContext } from '@/contexts/socket-context'
import { Chat } from '@/features/room/components/chat'
import { Footer } from '@/features/room/components/footer'
import { useContext, useEffect, useRef } from 'react'

export default function RoomPage({ params }: { params: { id: string } }) {
  const { socket } = useContext(SocketContext)

  const localStream = useRef<HTMLVideoElement>(null)
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})

  const initCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })

    if (localStream.current) localStream.current.srcObject = video
  }

  const createPeerConnection = (socketId: string) => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }

    const peer = new RTCPeerConnection(config)
    peerConnections.current[socketId] = peer
  }

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('Conectado')
      socket.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id,
      })

      await initCamera()
    })

    socket?.on('new user', (data: any) => {
      console.log('Novo usuário conectado', data)
      createPeerConnection(data.socketId)
      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
      })
    })
  }, [socket])

  return (
    <div className="flex h-[calc(100%-4rem)] w-full flex-col justify-between gap-5 p-5">
      <div className="flex h-[calc(100vh-188px)] w-full gap-5">
        <div className="flex h-full w-full flex-col gap-5 overflow-y-auto sm:grid sm:w-[60%] sm:grid-cols-1 md:w-[80%] md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="mirror-mode h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="h-full w-full" autoPlay playsInline ref={localStream} />
          </div>
        </div>
        <div className="hidden h-full w-[20%] sm:flex sm:w-[40%] md:w-[20%]">
          <Chat roomId={params.id} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
