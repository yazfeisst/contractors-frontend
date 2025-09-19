import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import { EntriesContextProvider } from './context/EntryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EntriesContextProvider>
       <App />
    </EntriesContextProvider>
  </StrictMode>,
)
