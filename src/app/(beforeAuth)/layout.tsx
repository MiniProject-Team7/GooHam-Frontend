// components/Providers.tsx
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  // 클라이언트 컴포넌트이므로, useState로 한 번만 생성
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}