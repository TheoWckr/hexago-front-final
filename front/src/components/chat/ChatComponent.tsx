import React, { useEffect, useState } from 'react'
const socketIOClient = require('socket.io-client');


export const ChatComponent = () => {
    const socket = socketIOClient("http://localhost:3100");
    const [messages, setMessages] = useState<string[]>([]);
    const [writing, setWriting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const timeoutId = setTimeout(() => socket.emit("stopWritingMessage", "5fa424e6c4c5be08c7809355", "5fa426620efab0092ba9606a"), 1000);
        return () => clearTimeout(timeoutId);
      }, [message]);

    useEffect(() => {
        socket.on('message', (message: string, userIdList: string[]) => {
            console.log(message)
            console.log(userIdList)
            // dcheck if the connected userId is in userIdList
            setMessages(msgs => [ ...msgs, message ]);
        });
        socket.on('writing', (userId: string, userIdList: string[]) => {
            // check if userId is not in userIdList and check if the connected userId is in userIdList
            setWriting(true)
        });
        socket.on('stopWriting', (userId: string, userIdList: string[]) => {
            // check if userId is not in userIdList and check if the connected userId is in userIdList
            setWriting(false)
        });
    }, [])


    const sendMessage = ()  => {
        // socket newMessage params : message, userId, chatId
        const message = document.getElementById("chatInput") as HTMLInputElement;
        socket.emit("newMessage", message.value, "5fa424e6c4c5be08c7809355", "5fa426620efab0092ba9606a");
    }

    const writingMessage = (event: any) => {
        setMessage(event.target.value)
        // socket writingMessage params : userId, chatId
        socket.emit("writingMessage", "5fa424e6c4c5be08c7809355", "5fa426620efab0092ba9606a")
    }

    return (
        <div>
            {messages.map((message, i) => <div key={i}>{message}</div>)}
            <div className="row">
                <input id="chatInput" onChange={writingMessage} type="text"/>
                <button onClick={sendMessage}>Message</button>
            </div>
            { writing && (
                <div>Typing...</div>
            )}
        </div>
    )
}
