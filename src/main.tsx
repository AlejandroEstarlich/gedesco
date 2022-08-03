import React from 'react'
import ReactDOM from 'react-dom/client'
import { TableApp } from './TableApp'
import "./styles.css"
import "primereact/resources/themes/md-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TableApp />
  </React.StrictMode>
)
