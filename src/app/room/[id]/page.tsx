'use client'

import { SocketContext } from '@/contexts/socket-context'
import { Chat } from '@/features/room/components/chat'
import { Footer } from '@/features/room/components/footer'
import { useContext, useEffect, useRef, useState } from 'react'

interface IAnswer {
  sender: string
  description: RTCSessionDescription
}

interface ICandidate {
  candidate: RTCIceCandidate
  sender: string
}

interface IDataStream {
  id: string
  stream: MediaStream
}

export default function RoomPage({ params }: { params: { id: string } }) {
  const { socket } = useContext(SocketContext)

  const localStream = useRef<HTMLVideoElement>(null)
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({})

  const [remoteStreams, setRemoteStreams] = useState<IDataStream[]>([])
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(null)

  console.log(remoteStreams)

  const initLocaleCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })

    setVideoMediaStream(video)
    if (localStream.current) localStream.current.srcObject = video
  }

  const initRemoteCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    })

    return video
  }

  const createPeerConnection = async (socketId: string, createOffer: boolean) => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }

    const peer = new RTCPeerConnection(config)
    peerConnections.current[socketId] = peer

    const peerConnection = peerConnections.current[socketId]

    if (videoMediaStream) {
      videoMediaStream.getAudioTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream)
      })
    } else {
      const video = await initRemoteCamera()
      video.getTracks().forEach((track) => {
        peerConnection.addTrack(track, video)
      })
    }

    if (createOffer) {
      console.log('Creiando uma oferta')
      const peerConnection = peerConnections.current[socketId]
      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)

      socket?.emit('sdp', {
        to: socketId,
        sender: socket?.id,
        description: peerConnection.localDescription,
      })
    }

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0]

      const dataStream: IDataStream = {
        id: socketId,
        stream: remoteStream,
      }

      setRemoteStreams((prevState: IDataStream[]) => {
        if (!prevState.some((stream) => stream.id === socketId)) {
          return [...prevState, dataStream]
        }

        return prevState
      })
    }

    peerConnection.onconnectionstatechange = (event) => {
      switch (peerConnection.connectionState) {
        case 'disconnected':
          setRemoteStreams((prevState) => prevState.filter((stream) => stream.id !== socketId))
        case 'failed':
          setRemoteStreams((prevState) => prevState.filter((stream) => stream.id !== socketId))
        case 'closed':
          setRemoteStreams((prevState) => prevState.filter((stream) => stream.id !== socketId))
          break
      }
    }

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit('ice candidates', {
          to: socketId,
          sender: socket.id,
          candidate: event.candidate,
        })
      }
    }

    peerConnection.onsignalingstatechange = (event) => {
      switch (peerConnection.signalingState) {
        case 'closed':
          setRemoteStreams((prev) => prev.filter((stream) => stream.id != socketId))

          break
      }
    }
  }

  function logout() {
    videoMediaStream?.getTracks().forEach((track) => {
      track.stop()
    })

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.close()
    })
    socket?.disconnect()

    window.location.href = '/'
  }

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('Conectado')
      socket.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id,
      })

      await initLocaleCamera()
    })

    socket?.on('new user', (data: any) => {
      console.log('Novo usuário tentando conectar', data)
      createPeerConnection(data.socketId, false)
      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
      })
    })

    socket?.on('newUserStart', (data: any) => {
      console.log('Usuário conectado na sala:', data)
      createPeerConnection(data.sender, true)
    })

    socket?.on('ice candidates', async (data: ICandidate) => {
      const peerConnection = peerConnections.current[data.sender]
      if (data.candidate) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
      }
    })

    socket?.on('sdp', async (data: IAnswer) => {
      const peerConnection = peerConnections.current[data.sender]

      if (data.description.type === 'offer') {
        await peerConnection.setRemoteDescription(data.description)
        console.log('Criando resposta')
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)

        socket.emit('sdp', {
          to: data.sender,
          sender: socket.id,
          description: peerConnection.localDescription,
        })
      } else if (data.description.type === 'answer') {
        console.log('Ouvindo oferta')
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.description))
      }
    })
  }, [socket])

  return (
    <div className="flex h-[calc(100%-4rem)] w-full flex-col justify-between gap-5 p-5">
      <div className="flex h-[calc(100vh-188px)] w-full gap-5">
        <div className="flex h-full w-full flex-col gap-5 overflow-y-auto sm:grid sm:w-[60%] sm:grid-cols-1 md:w-[80%] md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
          <div className="h-full w-full rounded-md bg-customSecondary">
            <video src="" className="mirror-mode h-full w-full" autoPlay ref={localStream} />
          </div>
          {remoteStreams.map((stream, index) => (
            <div className="h-full w-full rounded-md bg-customSecondary" key={String(index + 10)}>
              <video
                src=""
                className="mirror-mode h-full w-full"
                autoPlay
                playsInline
                ref={(video) => {
                  if (video && video.srcObject != stream.stream) video.srcObject = stream.stream
                }}
              />
            </div>
          ))}
        </div>
        <div className="hidden h-full w-[20%] sm:flex sm:w-[40%] md:w-[20%]">
          <Chat roomId={params.id} />
        </div>
      </div>
      <Footer
        videoMediaStream={videoMediaStream}
        peerConnections={peerConnections!}
        localStream={localStream}
        logout={logout}
      />
    </div>
  )
}
