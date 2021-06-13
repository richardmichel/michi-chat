import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import { SocketProvider } from '@contexts/SocketContext'
import Container from 'react-bootstrap/Container'
import Chat from '@components/pages/Chat'

const App = () => (
    <div className="chat">
        <Provider store={store}>
            
            <SocketProvider>
                <Container fluid className="h-100">
                    <Chat />
                </Container>
            </SocketProvider>
           
        </Provider>
    </div>
)

export default App
