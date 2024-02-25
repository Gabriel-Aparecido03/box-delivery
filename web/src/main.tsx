import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './styles/global.css'
import { enalbleMSW } from './services/mocks/index.ts'

enalbleMSW().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )  
})