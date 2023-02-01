import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChatApp } from './chatApp'
import { store } from './store/store'
import { Provider } from 'react-redux'
import './styles/index.css'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <Provider store={store}>
        <ChatApp />
      </Provider>
    </ChatContextProvider>
  </AuthContextProvider>

)
