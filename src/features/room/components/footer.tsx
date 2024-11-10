import { MicIcon, MicOffIcon, PhoneIcon, PhoneOff, Tv2, Video, VideoOff } from 'lucide-react'

import { ControlButton } from './control-button'
import { MdTvOff } from 'react-icons/md'
import { useState } from 'react'

interface FooterProps {
  videoMediaStream: MediaStream | null
}

export function Footer({ videoMediaStream }: FooterProps) {
  const icons = [
    { icon: MicIcon, disabledIcon: MicOffIcon, onClick: toggleMuted },
    { icon: Video, disabledIcon: VideoOff },
    { icon: Tv2, disabledIcon: MdTvOff },
    { icon: PhoneIcon, disabledIcon: PhoneOff },
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
    console.log('executou')
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
