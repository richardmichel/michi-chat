import React, { Fragment, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Login from '@pages/Auth/Login';
import ContacList from './contact/ContacList';
import MessageList from './message/MessageList';
import MessagePanel from './message/MessagePanel';
import { ChatSelect } from './message/ChatSelect';

import './Chat.scss'

const Chat = () => {
    const [selectedContact, setSelectedContact] = useState(null)
    const authenticate = useSelector((state) => state?.auth?.authenticate)

    const clickSelected = (value) =>{
        setSelectedContact(value);
        
    }

    return (
        <Fragment>
        
            <Row>
                <Col md="12">
                    <Container fluid className="h-100 mt-5">
                        <h3 className="text-light">Chat Michi</h3>

                        {!authenticate && <Login />}

                        {authenticate && (
                            <Row className="justify-content-center h-100">
                                <ContacList
                                    setSelectedContact={clickSelected}
                                    selectedContact={selectedContact}
                                />
                                <Col md="8" xl="6 " className="chat">
                                    <Card>
                                        <MessagePanel
                                            selectedContact={selectedContact}
                                        />
                                        {!selectedContact && <ChatSelect/>}
                                        {selectedContact && <MessageList selectedContact={selectedContact}/>}
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}
export default Chat
