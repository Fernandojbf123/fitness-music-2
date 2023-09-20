import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FitnessProvider } from './context/fitnessProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FitnessProvider>
      <App />
    </FitnessProvider>
  </React.StrictMode>,
)
