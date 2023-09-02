import './globals.css'
import { connectToDatabase } from '@utils/connectDB';
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import dotenv from 'dotenv-safe';
dotenv.config();

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next App Templet',
  description: 'gilhyeon by next app',
}

export default function RootLayout({Component, 
  children,
}: {
  children: React.ReactNode,
  Component: React.Component,
}) {
  connectToDatabase();

  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
