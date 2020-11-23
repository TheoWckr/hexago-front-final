import { createStyles, TextareaAutosize, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { axios, MAIN_ADRESS } from '../../utils/utilsAxios';
import Send from '@material-ui/icons/SendOutlined';
import "./Chat.css";

const socketIOClient = require('socket.io-client');

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: 0
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: -10,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: -1,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export const ChatComponent = () => {
    const socket = socketIOClient("http://localhost:3100");
    const [messages, setMessages] = useState<any>([]);
    const [writing, setWriting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<object[]>([]);
    const [chatId, setChatId] = useState<string>()
    const classes = useStyles();

    useEffect(() => {
        // socket stopWritingMessage params :  userId, chatId
        const timeoutId = setTimeout(() => socket.emit("stopWritingMessage", "5fa424e6c4c5be08c7809355", chatId), 1000);
        return () => clearTimeout(timeoutId);
      }, [message]);

    useEffect(() => {
        async function getChats() {
            // replace 5fa424e6c4c5be08c780935 by connected userId
            await axios.get(MAIN_ADRESS + "chat/5fa424e6c4c5be08c7809355")
            .then((res: any) => {
                setChat(res.data.content)
                if (chatId) {
                    setMessages(res.data.content.find((chat: any) => chat._id === chatId).messages)
                }
            })
            .catch((err: any) => {
                console.log(err)
            })
        }
        getChats()
        socket.on('message', (message: string, id: string) => {
            // dcheck if the connected userId is in userIdList
            if (id === chatId) {
                // setMessages(msgs => [ ...msgs, message ]);
                getChats()
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
        (document.getElementById("chatInput") as HTMLInputElement).value = ""
    }

    const writingMessage = (event: any) => {
        setMessage(event.target.value)
        // socket writingMessage params : userId, chatId
        socket.emit("writingMessage", "5fa424e6c4c5be08c7809355", chatId)
    }

    const onChatClick = (chatId: string, messages: any) => {
        (document.getElementById("chatInput") as HTMLInputElement).value = ""
        setChatId(chatId)
        console.log(messages)
        setMessages(messages);
    }

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        {chat.map((conv: any, index: any) => (
                            <ListItem button key={index} onClick={() => onChatClick(conv._id, conv.messages)}>
                                <ListItemText primary={conv.userIdNames} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>           
                <div style={{display: "flex", flexDirection: "column", overflowY: "scroll", height: "78vh"}}>
                    {messages.map((message: any, i: any) => {
                            if (message.userId.indexOf("5fa424e6c4c5be08c7809355") !== -1) {
                                return (
                                    <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "end"}}>
                                        <div key={i} className="speech-bubble" style={{wordBreak: "break-word"}}>{message.message}</div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "start"}}>
                                        <div key={i} className="speech-bubble" style={{wordBreak: "break-word"}}>{message.message}</div>
                                    </div>
                                )
                            }
                        }
                    )}

                </div>
                <div style={{position: "absolute", bottom: "2%", width: "75%"  }}>
                        { writing && (
                            <div>Typing...</div>
                        )}
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <TextareaAutosize style={{width: "90%"}} id="chatInput" onChange={writingMessage} placeholder="Ecrivez votre message ici" rowsMin={3} rowsMax={10}/>
                            <Button variant="outlined" color="primary" onClick={sendMessage}><Send/></Button>
                        </div>
                    </div>
            </main>
        </div>
    )
}
