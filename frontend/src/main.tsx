import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { AuthGuard } from './components/auth/AuthGuard.tsx'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles.ts'
import { AlertProvider } from './components/shared/Alert/AlertProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <AlertProvider>
      <AuthGuard>
        <App />
      </AuthGuard>
    </AlertProvider>
  </>,
)
