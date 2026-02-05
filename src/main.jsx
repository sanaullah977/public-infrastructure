import { StrictMode } from 'react'
import { RouterProvider } from "react-router/dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
