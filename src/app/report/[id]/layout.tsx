'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Head from 'next/head';

const queryClient = new QueryClient()

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Head>
        <script src="/chatbot/workers/viewer.mjs" async/>
      </Head> */}
      {children}
    </QueryClientProvider>
  )
}
