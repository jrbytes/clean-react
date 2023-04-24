import React from 'react'
import { createRoot } from 'react-dom/client'

import Routes from '@/main/routes/router'
import '@/presentation/styles/global.scss'

const rootElement = document.getElementById('main')
createRoot(rootElement).render(<Routes />)
