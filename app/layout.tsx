import type { Metadata } from 'next';
import './globals.css';

import { MovieProvider } from './contexts/MovieContext';
import { PaginationProvider } from './contexts/PaginationContext';

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
      <body className='bg-zinc-900'>
        <PaginationProvider>
          <MovieProvider>
            {children}
          </MovieProvider>
        </PaginationProvider>
      </body>
    </html>
  )
}
