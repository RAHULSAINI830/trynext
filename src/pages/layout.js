// import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'SmartNeev - Find your dream home',
//   description: 'SmartNeev - Find your dream home',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="SmartNeev" content="This is the description of my webpage." />

      </head>
      <body className={inter.className}>
       
        
        {children}</body>
    </html>
  )
}
