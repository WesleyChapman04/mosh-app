'use client'
import {
    QueryClient,
    QueryClientProvider as ClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function QueryClientProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return <ClientProvider client={queryClient}>{children}</ClientProvider>
}
