import React, { useEffect, createContext } from 'react'
import { useSocket } from '@hooks/useSocket'
import { configSocket } from '@config/settings'
import { useDispatch, useSelector } from 'react-redux'
import { types } from '@types/types'

const { host, authEndpoint } = configSocket

export const SocketContext = createContext()
export const SocketProvider = ({ children }) => {
    const { socket, online, connectSocket, disconnectSocket } = useSocket({
        host,
        authEndpoint
    })

    const { authenticate,  user } = useSelector((state) => state.auth)
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (authenticate && user?.id) {
            connectSocket()
        }
    }, [authenticate, connectSocket])

    useEffect(() => {
        if (!authenticate) {
            disconnectSocket()
        }
    }, [authenticate, disconnectSocket])

    useEffect(() => {
            socket
                ?.private(`private-chat.${user?.id}`)
                ?.listen('.chat-monitor', (payload) => {
                    console.log(
                        'chat-monitor:',
                        JSON.stringify(payload)
                    )
                     dispatch({
                        type: types.setMessages,
                        payload: payload,
                    });

                    

                })
    }, [socket, dispatch])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}
