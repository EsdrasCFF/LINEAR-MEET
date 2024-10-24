import { MicIcon, MicOffIcon, PhoneIcon, Tv2 } from 'lucide-react'

import { ControlButton } from './control-button'

export function Footer() {
  const icons = [{ icon: MicIcon }, { icon: MicOffIcon }, { icon: Tv2 }, { icon: PhoneIcon }]

  return (
    <footer className="flex w-full items-center justify-center bg-customBackground">
      <div className="bottom-5 grid w-full max-w-7xl grid-cols-3">
        <span className="col-span-1 text-xl font-medium text-white">10:00</span>
        <div className="flex">
          {icons.map((icon, index) => (
            <ControlButton icon={icon.icon} key={String(index + 'ba')} />
          ))}
        </div>
        <div> </div>
      </div>
    </footer>
  )
}