import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HAPPY BIRTHDAY MY LOVE',
  description: 'MADE WITH 💜',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
