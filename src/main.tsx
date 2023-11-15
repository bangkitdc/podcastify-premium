import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../public/styles/pagination.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from '@/redux/store.ts'
import AuthProvider from './providers/AuthProvider.tsx'
import APIProvider from './providers/ApiProvider.tsx';
import PrimaryNotification from './components/shares/notifications/Primary.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PrimaryNotification />
        <APIProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </APIProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
