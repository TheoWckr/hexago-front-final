import React, {useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {GameCreatePanel1} from "./gameCreatePanel1";
import GameCreatePanel3 from "./gameCreatePanel3";
import GameCreatePanel2 from "./gameCreatePanel2";
import {GameModel} from "../../../models/gameModel";
import {GameService} from "../../../services/gameService";
import {UtilsAxios} from "../../../utils/utilsAxios";
import {useParams} from "react-router";
import {FormContext, useForm} from "react-hook-form";
import {Button, Grid, List, ListItem, ListItemText, Paper} from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;


    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export const useStylesPanelCreatePage = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: '2em',
    },
    panel: {
        width: '90%',
        margin: '3%',
        paddingLeft: '20%',
        paddingRight: '20%',
    },
    textField: {
        paddingBottom: '2em',
    },
    errorTab:{
        backgroundColor:theme.palette.error.light,
    }
}));

export default function FullWidthTabs() {
    const classes = useStylesPanelCreatePage();
    const theme = useTheme();
    const [valueTabs, setValueTabs] = React.useState(0);
    const [errorMessages, setErrorMessage] = React.useState([] as string[]);
    const [gameState, setGameState] = React.useState(new GameModel({}));
    const [gameStatut, setGameStatut] = React.useState('');


    let {id} = useParams();
    const methods = useForm<GameModel>();

    /**
     * Return true if the validation is completed or send errorMessage if not
     */
    const validation = ():boolean => {
        const errorList = new Array<string>();
        if (gameState.name.trim().length === 0){
            errorList.push('name')
        }
        if (gameState.genres.length === 0){
            errorList.push('genres')
        }

        if (gameState.description.trim().length <= 15){
            errorList.push('description')
        }
        console.log('Error List', errorList);

        setErrorMessage(errorList);
        return errorList.length == 0;
    };

    const onCreate = () => {
        if (validation()) {
            GameService.createGame(gameState).then((response) => {
                if(response.status !== 200)
                    console.log('error' , response);
                else
                    console.log('Create', response);
                    setGameStatut('Game successfully created');
            });
        }
    };

    const onUpdate = () => {
        if(validation()){
            GameService.updateGame(gameState).then((response: any) => {
                    console.log('On Update ', response );
                    setGameStatut('Game successfully updated');

                }
            )
        }
    };

    const onDelete = () => {
        if(gameState._id) {
            GameService.deleteGame(gameState._id).then((response) => {
                console.log(response);
                setGameState(new GameModel());
                setGameStatut('Game successfully deleted');
            })
        }
    };


    const errorDisplay = (
        <Paper>
        <List>
            {errorMessages.includes('name') &&
            <ListItem>
                <ListItemText>Name is mandatory</ListItemText>
            </ListItem>
            }
            {errorMessages.includes('description') &&
            <ListItem>
                <ListItemText>Description is mandatory</ListItemText>
            </ListItem>
            }
            {errorMessages.includes('genres') &&
            <ListItem>
                <ListItemText>The game need at least one genre</ListItemText>
            </ListItem>
            }
    </List>

    </Paper>);
    const displayGameStatut = (
        <Paper >
            <Typography variant={"h6"} style={{padding: '2em'}}> {gameStatut} </Typography>
        </Paper>);


    const changeGameState = (properties: string, value: any) => {
        setGameState((prevState => {
            return {
                ...prevState,
                [properties]: value
            }
        }));
        console.log(gameState);
    };
    useEffect(() => {
        if (id) {
            GameService.getGame(id).then((value) => {
                    console.log(UtilsAxios.displayReponse(value));
                    setGameState(new GameModel(value.data.content));
                }
            )
        }
    }, []);

    //Handle changes
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValueTabs(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValueTabs(index);
    };



    return (
        <div className={classes.root}>
            <Grid container style={{padding : '1em'}}>
                {gameState && gameState._id?.length === 0 && <Button variant="outlined" name='create' onClick={onCreate} color="primary" style={{width: '300px', margin: 'auto'}}
            >Create</Button> }
                {gameState && gameState._id?.length !== 0 &&  <Button variant="outlined"  onClick={onUpdate} name='update' color="primary" style={{width: '300px', margin: 'auto'}}
            >Update
            </Button> }
                {gameState && gameState._id?.length !== 0 &&  <Button variant="outlined"  onClick={onDelete} name='delete' color="default" style={{width: '300px', margin: 'auto'}}
            >Delete
            </Button> }
            </Grid>
            {errorMessages.length !== 0 && errorDisplay}
            { gameStatut.length !== 0 && displayGameStatut}
                <AppBar position="static" color="default">
                <Tabs
                    value={valueTabs}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    variant="fullWidth"
                    aria-label="Game Creation"

                >
                    <Tab className={errorMessages.includes('description') || errorMessages.includes('name') ? classes.errorTab :''} label="Game definition"  {...a11yProps(0)} />
                    <Tab className={errorMessages.includes('genres') ? classes.errorTab :''} label="Game properties " {...a11yProps(1)} />
                    <Tab label="Images " {...a11yProps(2)} />
                </Tabs>
            </AppBar>
                <FormContext {...methods} >
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={valueTabs}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={valueTabs} index={0} dir={theme.direction}>
                            <GameCreatePanel1 game={gameState} changeGameState={changeGameState}
                                              key={'gameCreatePanel1'}/>
                        </TabPanel>
                        <TabPanel value={valueTabs} index={1} dir={theme.direction}>
                            <GameCreatePanel2 game={gameState} changeGameState={changeGameState} key={'gameCreatePanel2'}/>
                        </TabPanel>
                        <TabPanel value={valueTabs} index={2} dir={theme.direction}>
                            <GameCreatePanel3 game={gameState} changeGameState={changeGameState}  key={'gameCreatePanel3'}/>
                        </TabPanel>
                    </SwipeableViews>
                </FormContext>
        </div>
    );
}
