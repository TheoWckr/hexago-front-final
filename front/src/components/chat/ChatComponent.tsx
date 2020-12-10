import { createStyles, TextareaAutosize, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Send from '@material-ui/icons/SendOutlined';
import EditIcon from '@material-ui/icons/Edit';
import "./Chat.css";
import {UtilsString} from "../../utils/utilsString";
import { useHistory } from 'react-router-dom';
import {axios, MAIN_ADRESS, UtilsAxios} from '../../utils/utilsAxios';

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
    const socket = socketIOClient(MAIN_ADRESS);
    const [messages, setMessages] = useState<any>([]);
    const [writing, setWriting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<object[]>([]);
    const [users, setUsers] = useState<object[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<object[]>([]);
    const [chatId, setChatId] = useState<string>();
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const userId = localStorage.getItem("userId")
    const classes = useStyles();
    const history = useHistory();


    useEffect(() => {
        // socket stopWritingMessage params :  userId, chatId
        const timeoutId = setTimeout(() => socket.emit("stopWritingMessage", userId, chatId), 1000);
        return () => clearTimeout(timeoutId);
      }, [message]);

    async function getChats() {
        await axios.get(MAIN_ADRESS + "chat/" + userId)
        .then((res: any) => {
            setChat(res.data.content)
            if (chatId) {
                setMessages(res.data.content.find((chat: any) => chat._id === chatId).messages)
            }
        })
        .catch((err: any) => {
        })
    }

    useEffect(() => {
        if (!userId){
            history.push("/login")
        }
        getChats()
        getUsers()
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


    const createChat = async () => {
        const usersId = selectedUsers.map((x: any) => x._id)
        if (usersId.length === 0) {
            alert("Veuillez séléctionner au moins un contact")
            return;
        }
        usersId.push(userId)
        const header = {
            headers : {
                token: localStorage.getItem("token")
            }
        };
        await axios.post(MAIN_ADRESS + "chat/create", {userIdList: usersId, messages: []}, header)
        .then((res: any) => {
            getChats()
            setIsCreate(false)
        })
        .catch((err: any) => {
            console.log(err)
        })
    }

    const getUsers = async () => {
        const header = {
            headers : {
                token: localStorage.getItem("token")
            }
        };
        await axios.get(MAIN_ADRESS + "users", header)
        .then((res: any) => {
            setUsers(res.data.content)
        })
        .catch((err: any) => {
            console.log(err)
        })
    }

    const sendMessage = ()  => {
        const message = document.getElementById("chatInput") as HTMLInputElement;
        // socket newMessage params : message, userId, chatId
        socket.emit("newMessage", message.value, userId, chatId);
        (document.getElementById("chatInput") as HTMLInputElement).value = ""
    }

    const writingMessage = (event: any) => {
        setMessage(event.target.value)
        // socket writingMessage params : userId, chatId
        socket.emit("writingMessage", userId, chatId)
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
                    {isCreate === false ? (
                        <div>
                            <div style={{display: "flex", flexDirection: "row-reverse", margin: "10px"}}>
                                <Button variant="outlined" color="primary" onClick={() => {setIsCreate(true); getUsers();}}><EditIcon/></Button>
                            </div>
                            {chat.length === 0 ? (
                                <div style={{textAlign: "center", marginTop: "30vh"}}>Pas de conversations trouvées</div>
                            ) : (
                                <List>
                                    {chat.map((conv: any, index: any) => {
                                        if (conv._id === chatId) {
                                            return (
                                                <ListItem button key={index} onClick={() => onChatClick(conv._id, conv.messages)} className="conv-active">
                                                    <ListItemText primary={UtilsString.arrayToForm(conv.userIdNames)} style={{color: "white"}} />
                                                </ListItem>
                                            )
                                        } else {
                                            return (
                                                <ListItem button key={index} onClick={() => onChatClick(conv._id, conv.messages)}>
                                                    <ListItemText primary={UtilsString.arrayToForm(conv.userIdNames)} />
                                                </ListItem>
                                            )
                                        }
                                    })}
                                </List>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Button color="primary" onClick={() => setIsCreate(false)}>Retour</Button>
                                <Button color="primary" onClick={createChat}>Ok</Button>
                            </div>
                            {selectedUsers.map((user: any, index: any) => (
                                <ListItem key={index} >
                                    <ListItemText primary={user.firstname + " " + user.lastname} />
                                    <Button color="primary" onClick={() => {setUsers([user, ...users]);setSelectedUsers(selectedUsers.filter((x: any) => x._id !== user._id))}}>X</Button>
                                </ListItem>
                            ))}
                            <List>
                                {users.map((user: any, index: any) => {
                                    if (user._id !== userId) {
                                        return (
                                            <ListItem button key={index} onClick={() => {setSelectedUsers([...selectedUsers, user]); setUsers(users.filter((x: any) => x._id !== user._id))}}>
                                                <ListItemText primary={user.firstname + " " + user.lastname} />
                                            </ListItem>
                                        )
                                    }
                                })}
                            </List>
                        </div>
                    )}
                </div>
            </Drawer>
            <main className={classes.content}>           
                <div style={{display: "flex", flexDirection: "column", overflowY: "scroll", height: "78vh"}}>
                    {messages.map((message: any, i: any) => {
                            let user = users.map((x: any) => {
                                if (x._id === message.userId) {
                                    return x.firstname
                                }
                            })

                            user = user.filter(x => x !== undefined)
                            if (message.userId.indexOf(userId) !== -1) {
                                return (
                                    <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "end"}}>
                                        <div key={i} className="speech-bubble" style={{wordBreak: "break-word", maxWidth: "50%"}}>{message.message}</div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "start", maxWidth: "50%"}}>
                                        <div className="col">
                                            <div>{user[0]}</div>
                                            <div key={i} className="speech-bubble" style={{wordBreak: "break-word"}}>{message.message}</div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    )}

                </div>
                <div>
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
