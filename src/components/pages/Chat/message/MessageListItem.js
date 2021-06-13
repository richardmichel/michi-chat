import React from 'react'
import PropTypes from 'prop-types'
import {hourMonth } from '@helpers/formatDate';

export const propTypes = {
    send: PropTypes.bool,
}

const defaultProps = {
    send: false,
}

const MessageListItem = ({ item, send }) => (
    <div
        className={`d-flex ${
            !send ? 'justify-content-start' : 'justify-content-end'
        } mb-4 mt-5`}
    >
        {!send && (
            <div className="img_cont_msg">
                <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    className="rounded-circle user_img_msg"
                />
            </div>
        )}

        <div className={`${!send ? 'msg_cotainer' : 'msg_cotainer_send'}`}>
           {item?.message_body}
            <span className={`${!send ? 'msg_time' : 'msg_time_send'}`}>
            {hourMonth(item?.created_at)} 
            </span>
        </div>
        {send && (
            <div className="img_cont_msg">
                <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    className="rounded-circle user_img_msg"
                />
            </div>
        )}
    </div>
)

MessageListItem.propTypes = propTypes
MessageListItem.defaultProps = defaultProps
export default MessageListItem
