import { BrowserRouter } from 'react-router'
import { Router } from './pages/Router'
import { AuthGuard } from './components/auth/AuthGuard'

export default function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Router />
      </AuthGuard>
    </BrowserRouter>
  )
}
