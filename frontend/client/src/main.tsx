import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './app/layout/style.css'
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router';
import { router } from './app/router/router';
import { store, StoreContext } from './libs/stores/store';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      </QueryClientProvider>
    </StoreContext.Provider>
  </StrictMode>,
)
