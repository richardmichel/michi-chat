import React, { Fragment, useState, useContext } from 'react'
import { Form, FormControl, InputGroup, Button, Card } from 'react-bootstrap'
import { ServiceFactory } from '@services/ServiceFactory';
import { SocketContext } from '@contexts/SocketContext';
import { scrollToBottom } from '@helpers/scrollToBottom';

const ChatService = ServiceFactory.get('chat')

const MessageItemInput = React.memo(({
    callbackNewMessage,
    selectedContact
}) => {

    const { socket } = useContext(SocketContext);


    const [message, setMessage] = useState('')

    const sendMessage = async (evt) => {
        evt.preventDefault();
        try {
            if (message?.trim() === '') return false
            const response = await ChatService.storeMessage({
                payload: {
                    message,
                    contactHashId: selectedContact?.hash 
                },
              socket
            });
            setMessage('');
            callbackNewMessage(response?.message);
            scrollToBottom('myMessages');
            return true;
        } catch (responseErrors) {
            console.log({ responseErrors });
            return false;
        }
    }

    return (
        <Fragment>
            <Card.Footer>
                <Form onSubmit={sendMessage}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text className="attach_btn">
                                <i className="fas fa-paperclip"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Escribe tu mensaje..."
                            aria-label="Mensaje..."
                            aria-describedby="chatId"
                            className="type_msg"
                            value={message}
                            onChange={({ target: { value } }) => setMessage(value)}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-secondary"
                                className="send_btn"
                                type="submit"
                            >
                                <i className="fas fa-location-arrow"></i>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Card.Footer>
        </Fragment>
    )
});

export default MessageItemInput
