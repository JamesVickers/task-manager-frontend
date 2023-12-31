'use client'

import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navbar from './components/navbar'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient();

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang='en'>
        <body className={inter.className}>
          <Navbar />
          {children}
          <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
        </body>
      </html>
    </QueryClientProvider>
  )
}

export default RootLayout;
