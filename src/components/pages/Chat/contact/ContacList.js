import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { ServiceFactory } from '@services/ServiceFactory'

const ChatService = ServiceFactory.get('chat')

const ContacList = ({ setSelectedContact, selectedContact }) => {
    const [contacts, setContacts] = useState([])
    const [query, setQuery] = useState(null)
    const initService = async () => {
        try {
            const response = await ChatService.getContacts()
            setContacts(
                response?.contacts || []
            );
        } catch (responseErrors) {
            console.log({ responseErrors })
            setContacts([])
        }
    }
    useEffect(() => {
        initService()
    }, [])
    return (
        <div className="col-md-4 col-xl-3 chat">
            <Card className="mb-sm-3 mb-md-0 contacts_card">
                <Card.Header>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search..."
                            name=""
                            value={query || ''}
                            className="form-control search"
                            onChange={({ target: { value } }) => {
                                setQuery(value)
                            }}
                        />
                        <div className="input-group-prepend">
                            <span className="input-group-text search_btn">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body className="contacts_body">
                    <ui className="contacts">
                        {contacts?.map((iteration, index) => (
                            <li
                                className={`hover-click ${
                                    iteration?.id === selectedContact?.id
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => setSelectedContact(iteration)}
                                key={index}
                            >
                                <div className="d-flex bd-highlight">
                                    <div className="img_cont">
                                        <img
                                            /* src={iteration?.pic}
                                             */
                                            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                                            className="rounded-circle user_img"
                                        />
                                        <span className="online_icon"></span>
                                    </div>
                                    <div className="user_info">
                                        <span>{iteration?.name}</span>
                                        <p>{iteration?.name} is online</p>
                                    </div>
                                </div>
                            </li>
                        ))}

                        {/* <li>
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img
                                        src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg"
                                        className="rounded-circle user_img"
                                    />
                                    <span className="online_icon offline"></span>
                                </div>
                                <div className="user_info">
                                    <span>Rashid Samim</span>
                                    <p>Rashid left 50 mins ago</p>
                                </div>
                            </div>
                        </li> */}
                    </ui>
                </Card.Body>
                <Card.Footer />
            </Card>
        </div>
    )
}

export default ContacList
