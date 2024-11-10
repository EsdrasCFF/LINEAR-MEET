import { MicIcon, MicOffIcon, PhoneIcon, PhoneOff, Tv2, Video, VideoOff } from 'lucide-react'

import { ControlButton } from './control-button'
import { MdTvOff } from 'react-icons/md'
import { MutableRefObject, useState } from 'react'

interface FooterProps {
  videoMediaStream: MediaStream | null
  peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>
  localStream: MutableRefObject<HTMLVideoElement | null>
  logout: () => void
}

export function Footer({ videoMediaStream, peerConnections, localStream, logout }: FooterProps) {
  const icons = [
    { icon: MicIcon, disabledIcon: MicOffIcon, onClick: toggleMuted },
    { icon: Video, disabledIcon: VideoOff, onClick: toggleVideo },
    { icon: Tv2, disabledIcon: MdTvOff, onClick: toggleScreenSharing },
    { icon: PhoneIcon, disabledIcon: PhoneOff, onClick: logout },
  ]

  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  function toggleMuted() {
    videoMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = isMuted
    })
    setIsMuted(!isMuted)

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender: any) => {
        if (sender.track?.kind === 'audio') {
          sender.replaceTrack(videoMediaStream?.getAudioTracks().find((track) => track.kind === 'audio'))
        }
      })
    })
  }

  function toggleVideo() {
    videoMediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOff
    })

    setIsCameraOff(!isCameraOff)

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender: any) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(videoMediaStream?.getVideoTracks().find((track) => track.kind === 'video'))
        }
      })
    })
  }

  async function toggleScreenSharing() {
    if (!isScreenSharing) {
      const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      })
      if (localStream.current) localStream.current.srcObject = videoShareScreen

      Object.values(peerConnections.current).forEach((peerConnections) => {
        peerConnections.getSenders().forEach((sender: any) => {
          if (sender.track?.kind === 'video') {
            sender.replaceTrack(videoShareScreen.getVideoTracks()[0])
          }
        })
      })

      setIsScreenSharing(!isScreenSharing)
      return
    }

    if (localStream.current) localStream.current.srcObject = videoMediaStream

    Object.values(peerConnections.current).forEach((peerConnections) => {
      peerConnections.getSenders().forEach((sender: any) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(videoMediaStream?.getVideoTracks()[0])
        }
      })
    })
    setIsScreenSharing(!isScreenSharing)
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex max-h-20 min-h-20 w-full items-center justify-center bg-customBackground p-5 font-rubik">
      <div className="grid w-full max-w-7xl grid-cols-3 items-center xl:px-5">
        <span className="text-xl font-medium text-white">{hours + ':' + minutes}</span>
        <div className="flex items-center justify-center gap-2">
          {icons.map((icon, index) => (
            <ControlButton
              icon={icon.icon}
              key={String(index + 'ba')}
              disabledIcon={icon.disabledIcon}
              onToggleClick={icon.onClick!}
            />
          ))}
        </div>
        <div> </div>
      </div>
    </footer>
  )
}
