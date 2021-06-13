import { useCallback, useEffect, useState } from 'react'
import Echo from 'laravel-echo'
import socketio from 'socket.io-client';
import { APP_TOKEN } from '@config/settings'

export const useSocket = ({ host   }) => { 
    const [socket, setSocket] = useState(null)
    const [online, setOnline] = useState(false)

    const connectSocket = useCallback(() => {
        const BearerToken = sessionStorage.getItem(APP_TOKEN)
        const socketTemp = new Echo({
            host: host,
            broadcaster: 'socket.io',
            client: socketio,
            csrfToken: null,
            transports: ['websocket'],
             auth: {
                headers: {
                    Authorization: `Bearer ${BearerToken}`,
                    Accept: 'application/json',
                },
            }, 
        })
        setSocket(socketTemp)
    }, [host])

    const disconnectSocket = useCallback(() => {
        console.log('socket.disconnect')
        socket?.disconnect()
    }, [socket])

    useEffect(() => {
        console.log('socket.connected:->', socket?.connected)
        setOnline(socket?.connected)
    }, [socket])

    useEffect(() => {
       
        
            socket?.connector?.socket?.on('connect', () => {
                console.log('connected', socket?.socketId())
                setOnline(true)
            })
    }, [socket])

    useEffect(() => {
        socket?.connector?.socket?.on('disconnect', () => {
                console.log('disconnected')
                setOnline(false)
            })
    }, [socket])

    useEffect(() => {
            socket?.connector?.socket?.on('reconnecting', (attemptNumber) => {
                console.log(
                    `%cSocket reconnecting attempt ${attemptNumber}`,
                    'color:orange; font-weight:700;'
                )
            })
    }, [socket])

    useEffect(() => {
    
            socket?.connector?.socket?.on('connect_error', (channel, data) => {
                console.log('connect_error', channel, data)
            })
    }, [socket])

    useEffect(() => {
            socket?.connector?.socket?.on('connect_timeout', (channel, data) => {
                console.log('connect_timeout', channel, data)
            })
    }, [socket])

    useEffect(() => {
            socket?.connector?.socket?.on('error', (channel, data) => {
                console.log('error', channel, data)
            })
    }, [socket])

    return {
        socket,
        online,
        connectSocket,
        disconnectSocket,
    }
}
