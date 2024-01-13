import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import 'react-day-picker/dist/style.css';

const inter = Inter({ subsets: ['latin'] });



export const metadata: Metadata = {
  title: 'Stacks / Project Management',
  description: 'Stacks is a project management tool for developers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
