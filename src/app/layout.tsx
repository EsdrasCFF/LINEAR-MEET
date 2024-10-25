import type { Metadata } from 'next'
import './globals.css'
import { Inter, Rubik } from 'next/font/google'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const rubik = Rubik({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} ${inter.className} flex h-screen max-h-screen w-full flex-col items-center overflow-y-auto bg-customBackground antialiased`}
      >
        <Header />
        <div className="max-w-7xl flex-1">{children}</div>
      </body>
    </html>
  )
}
