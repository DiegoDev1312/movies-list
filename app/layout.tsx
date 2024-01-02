import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MovieProvider } from './contexts/MovieContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movies List',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-white'>
      <body className='bg-white'>
        <MovieProvider>
          {children}
        </MovieProvider>
      </body>
    </html>
  )
}
