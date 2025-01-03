import React from 'react'
import Header from '@/components/layouts/header'
import Footer from '@/components/layouts/footer'
import '@/style/globals.css'
import { isAuth } from '@/utils/auth'

// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

export default async function RootLayout({ children, }: { children: React.ReactNode;
}) {
  const authenticate = await isAuth()

  return (
    <html lang="en">
    <body>
    {
      authenticate ? (
        <Header />
      ) : null
    }
    <main className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px-70px)]">
      {children}
    </main>
    <Footer />
    </body>
    </html>
  )
}
