import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

console.log('Starting application...');
try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </StrictMode>,
  )
  console.log('Application mounted successfully');
} catch (err) {
  console.error('Failed to mount application:', err);
}
