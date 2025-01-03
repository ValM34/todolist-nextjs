import React from 'react'

import Footer from '@/components/layouts/footer'
import '@/style/globals.css'
import { isAuth } from '@/utils/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'To do list',
  description: 'To do list créée par Valentin Moreau',
}

export default async function RootLayout({ children, }: {children: React.ReactNode; }) {

  const auth = await isAuth();

  if (auth) {
    redirect('/');
  }

  return (
    <html lang="en">
    <body>
    <main className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px-70px)]">
        {children}
    </main>
    <Footer />
    </body>
    </html>
  )
}
