import { MicIcon, MicOffIcon, PhoneIcon, PhoneOff, Tv2, Video, VideoOff } from 'lucide-react'

import { ControlButton } from './control-button'
import { MdTvOff } from 'react-icons/md'

export function Footer() {
  const icons = [
    { icon: MicIcon, disabledIcon: MicOffIcon },
    { icon: Video, disabledIcon: VideoOff },
    { icon: Tv2, disabledIcon: MdTvOff },
    { icon: PhoneIcon, disabledIcon: PhoneOff },
  ]

  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return (
    <footer className="fixed bottom-2 flex w-full items-center justify-center bg-customBackground px-5 font-rubik">
      <div className="bottom-5 grid w-full max-w-7xl grid-cols-3 items-center">
        <span className="text-xl font-medium text-white">{hours + ':' + minutes}</span>
        <div className="flex items-center justify-center gap-2">
          {icons.map((icon, index) => (
            <ControlButton icon={icon.icon} key={String(index + 'ba')} disabledIcon={icon.disabledIcon} />
          ))}
        </div>
        <div> </div>
      </div>
    </footer>
  )
}
