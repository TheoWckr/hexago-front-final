import React, { useEffect, useState } from 'react'
import { axios, MAIN_ADRESS } from '../../utils/utilsAxios';
const socketIOClient = require('socket.io-client');


export const ChatComponent = () => {
    const socket = socketIOClient("http://localhost:3100");
    const [messages, setMessages] = useState<string[]>([]);
    const [writing, setWriting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<object[]>([]);
    const [chatId, setChatId] = useState<string>()

    useEffect(() => {
        // socket stopWritingMessage params :  userId, chatId
        const timeoutId = setTimeout(() => socket.emit("stopWritingMessage", "5fa424e6c4c5be08c7809355", chatId), 1000);
        return () => clearTimeout(timeoutId);
      }, [message]);

    useEffect(() => {
        async function getChats() {
            // replace 5fa424e6c4c5be08c780935 by connected userId
            let chats: any = [];
            await axios.get(MAIN_ADRESS + "chat/5fa424e6c4c5be08c7809355")
            .then((res: any) => {
                chats = res.data.content
                console.log(res.data.content)
            })
            .catch((err: any) => {
                console.log(err)
            })
            console.log(chats)
            await chats.forEach(async (chat: any) => {
                chat.userIdNames = []
                await chat.userIdList.forEach((userId: any) => {
                    axios.get(MAIN_ADRESS + "users/" + userId, {headers: {token: localStorage.getItem("token")}})
                    .then((res: any) => {
                        chat.userIdNames.push(res.data.content.firstname + " " + res.data.content.lastname)
                    })
                    .catch((err: any) => {
                        console.log(err)
                    })
                });
            });
            setChat(chats)
        }
        getChats()
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
                    {chat.map((chat: any, i:number) => {
                        console.log(chat)
                        return (
                            <button key={i} onClick={() => onChatClick(chat._id, chat.messages)}>{chat.userIdList}</button>
                        )
                    }
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
