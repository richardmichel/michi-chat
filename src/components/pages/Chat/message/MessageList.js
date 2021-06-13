import React, { useState, useEffect, Fragment, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'react-bootstrap'
import { types } from '@types/types'
import { ServiceFactory } from '@services/ServiceFactory'

import { scrollToBottom, scrollToBottomAnimated } from '@helpers/scrollToBottom';
import MessageListItem from './MessageListItem'
import MessageItemInput from './MessageItemInput'

const ChatService = ServiceFactory.get('chat')

const MessageList = ({
    selectedContact
}) => {
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state?.auth);
    const socketMessages = useSelector((state) => state?.chat?.messages);
    const userId = user?.id;

    const initService = async () => {
        try {
            const {
                messages: { data },
            } = await ChatService.getMessages({
                contactHashId : selectedContact?.hash,
                pageSize: 100,

            })
            setMessages(data || []);

            scrollToBottom('myMessages');

        } catch (responseErrors) {
            console.log({ responseErrors })
            setMessages([])
        }
    }

    /* const callbackNewMessage = (newMessage) => {
        setMessages([...messages, newMessage])
    } */

    const callbackNewMessage =  useCallback(
        (newMessage) => {
            setMessages(acumulator => [...acumulator, {...newMessage}])
        },
        [setMessages],
    );

    useEffect(() => {
        if(selectedContact?.id){
            initService()
        }
    }, []);

    useEffect(() => {
        if(socketMessages.length > 0 ){
            const payload = [...messages, ...socketMessages.map(iteration => iteration?.message)];

            console.log({payload});
            setMessages(payload);
            dispatch({
                type: types.removeMessages
            });
            scrollToBottomAnimated('myMessages');
        }
    }, [socketMessages])

    return (
        <Fragment>
           
            <Card.Body className="msg_card_body" id="myMessages">
                {messages.map((item, index) => (
                    <MessageListItem
                        item={item}
                        userId={userId}
                        key={index}
                        {...{
                            ...(userId === item?.created_by_user_id && {
                                send: true,
                            }),
                        }}
                    />
                ))}
            </Card.Body>
            <MessageItemInput   
                selectedContact={selectedContact} 
                callbackNewMessage={callbackNewMessage} />
        </Fragment>
    )
}

export default MessageList
