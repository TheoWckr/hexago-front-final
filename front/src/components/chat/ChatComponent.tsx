import React, { useEffect, useState } from 'react'
import { axios, MAIN_ADRESS } from '../../utils/utilsAxios';
const socketIOClient = require('socket.io-client');


export const ChatComponent = () => {
    const socket = socketIOClient("http://localhost:3100");
    const [messages, setMessages] = useState<string[]>([]);
    const [writing, setWriting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<object[]>([
        {
            _id: "",
            messages: []
        }
    ]);
    const [chatId, setChatId] = useState<string>()

    useEffect(() => {
        // socket stopWritingMessage params :  userId, chatId
        const timeoutId = setTimeout(() => socket.emit("stopWritingMessage", "5fa424e6c4c5be08c7809355", chatId), 1000);
        return () => clearTimeout(timeoutId);
      }, [message]);

    useEffect(() => {
        // replace 5fa424e6c4c5be08c780935 by connected userId
        axios.get(MAIN_ADRESS + "chat/5fa424e6c4c5be08c7809355")
            .then((res: any) => {
                setChat(res.data.content)
            })
            .catch((err: any) => {
                console.log(err)
            })
        socket.on('message', (message: string, id: string) => {
            // dcheck if the connected userId is in userIdList
            if (id === chatId) {
                setMessages(msgs => [ ...msgs, message ]);
            }
        });
        socket.on('writing', (userId: string, id: string, userIdList: string[]) => {
            // check if userId is not in userIdList
            if (id === chatId) {
                setWriting(true)
            }
        });
        socket.on('stopWriting', (userId: string, id: string, userIdList: string[]) => {
            // check if userId is not in userIdList
            if (id === chatId) {
                setWriting(false)
            }
        });
    }, [chatId])


    const sendMessage = ()  => {
        const message = document.getElementById("chatInput") as HTMLInputElement;
        // socket newMessage params : message, userId, chatId
        socket.emit("newMessage", message.value, "5fa424e6c4c5be08c7809355", chatId);
    }

    const writingMessage = (event: any) => {
        setMessage(event.target.value)
        // socket writingMessage params : userId, chatId
        socket.emit("writingMessage", "5fa424e6c4c5be08c7809355", chatId)
    }

    const onChatClick = (chatId: string, messages: any) => {
        setChatId(chatId)
        setMessages(messages.map((item:any) => {
            return item['message'];
        }));
    }

    return (
        <div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{display: "flex", flexDirection: "column", width: "50%"}}>
                    <div>Liste des chats</div>
                    {chat.map((chat: any, i:number) =>
                        <button key={i} onClick={() => onChatClick(chat._id, chat.messages)}>{chat._id}</button>
                    )}
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    {messages.map((message, i) => <div key={i}>{message}</div>)}
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <input id="chatInput" onChange={writingMessage} type="text"/>
                        <button onClick={sendMessage}>Message</button>
                    </div>
                    { writing && (
                        <div>Typing...</div>
                    )}
                </div>
            </div>
        </div>
    )
}
