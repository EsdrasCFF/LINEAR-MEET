import { BsFillCloudsFill } from 'react-icons/bs'
import { SiGotomeeting } from 'react-icons/si'

export function Header() {
  return (
    <header className="flex max-h-[5.5rem] min-h-[5.5rem] w-full items-center justify-center bg-customSecondary">
      <div className="flex w-full max-w-7xl justify-between px-5">
        <div className="flex items-center gap-5">
          <BsFillCloudsFill className="text-customPrimary" size={30} />
          <span className="text-xl font-medium leading-none text-white">{"Let's Meet"}</span>
        </div>

        <SiGotomeeting size={35} className="text-customPrimary" />
      </div>
    </header>
  )
}
