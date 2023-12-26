

// Note: This is the Css for all pages
import '../styles/globals.css'

// Local fonts can be imported like this:
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: '../fonts/UbuntuMono-Bold.ttf',
      weight: '400',
      style: 'bold',
    },
    {
      path: '../fonts/UbuntuMono-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/UbuntuMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ], variable: '--font-ubuntu-mono'
})

// Framer motion
import { motion } from 'framer-motion'
// Components

import Nav from '@/components/Nav';
import TopLeft from '@/components/TopLeft'
import DownLeft from '@/components/DownLeft';
import TopRight from '@/components/TopRight';
import DownRight from '@/components/DownRight';
import ParticlesContainer from '@/components/ParticlesContainer';


export const metadata = {
  title: ' Weatherly',
  description: 'A weather app built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="64px" />
      </head>
      <body className={`${myFont.variable} font-ubuntu-mono`}  >
        {/* Particles */}
        <ParticlesContainer/>
        {/* Nav Head  */}
        <Nav />
        {/* Four Season Weather */}
        <TopLeft />
        <TopRight />
        <DownLeft />
        <DownRight />
        {children}
      </body>
    </html>
  )
}
