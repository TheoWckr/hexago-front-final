import React, { useEffect } from 'react'
const socketIOClient = require('socket.io-client');


export const ChatComponent = () => {

    useEffect(() => {
        const socket = socketIOClient("http://localhost:3100");

        // socket newMessage params : message, userId, chatId
        socket.emit("newMessage", "testMessage", "5fa424e6c4c5be08c7809355", "5fa426620efab0092ba9606a");
    }, [])

    return (
        <div>
            TEST
        </div>
    )
}
