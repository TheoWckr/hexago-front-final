import React, {useContext, useEffect, useState} from 'react';
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
import {SnackContext} from "../../../services/hooks/useSnackBar";

export interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

export function TabPanel(props: TabPanelProps) {
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

export function a11yProps(index: any) {
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
    errorTab: {
        backgroundColor: theme.palette.error.light,
    },
    paper:{
        padding: '3px',
        marginLeft:"10em",
        marginRight:"10em"
    },
    divSpace : {
        padding: '1em 0em',
    }
}));

const  GameCreatePage = () => {
    const classes = useStylesPanelCreatePage();
    const theme = useTheme();
    const [valueTabs, setValueTabs] = React.useState(0);
    const [errorMessages, setErrorMessage] = React.useState([] as string[]);
    const [gameState, setGameState] = React.useState(new GameModel({}));
    const [gameStatus, setGameStatus] = React.useState('');
    const {openSnack} = useContext(SnackContext)
    const [file,setFile] = useState<File>(new File(new Array<BlobPart>(),""));
    const [urlPicture, setUrlPicture] = useState("")
    const {id} = useParams<{ id: string }>();
    const methods = useForm<GameModel>();


    /*
     When the file is refresh , a new url is made to refresh the view
     */
    useEffect( () => {
        if(file.size>0)
        setUrlPicture( URL.createObjectURL(file))
        else {
            setUrlPicture("")
        }
    }, [file])
    /**
     * Return true if the validation is completed or send errorMessage if not
     */
    const validation = (): boolean => {
        const errorList = new Array<string>();
        if (gameState.name.trim().length === 0) {
            errorList.push('name')
        }
        if (gameState.genres.length === 0) {
            errorList.push('genres')
        }
        if (gameState.description.trim().length <= 15) {
            errorList.push('description')
        }

        setErrorMessage(errorList);
        return errorList.length === 0;
    };

    const onCreate = () => {
        if (validation()) {
            GameService.createGame(gameState, file).then((response) => {
                if (response.status !== 200 || response.data.error) {
                    setErrorMessage(['nameAlreadyExist']);
                }
                else {
                    setGameStatus('Jeu crée');
                    openSnack(gameState.name + " a été crée " )
                }
            });
        }
    };

    const onUpdate = () => {
        if (validation()) {
            GameService.updateGame(gameState).then((response: any) => {
                    openSnack(gameState.name + " a été supprimé " )
                }
            )
        }
    };

    const onDelete = () => {
        if (gameState._id) {
            GameService.deleteGame(gameState._id).then((response) => {
                setGameState(new GameModel());
                openSnack(gameState.name + " a été crée " )
            })
        }
    };


    const errorDisplay = (
        <Paper style={{padding : '0.5em'}} >
            <Typography variant={'h5'} style={{padding : '0.5em'}}> Erreurs</Typography>
            <List style={{color : theme.palette.text.secondary}}>
                {errorMessages.includes('name') &&
                <ListItem>
                    <ListItemText>Le nom est obligatoire </ListItemText>
                </ListItem>
                }
                {errorMessages.includes('nameAlreadyExist') &&
                <ListItem>
                    <ListItemText>Ce nom est déja utilisé</ListItemText>
                </ListItem>
                }
                {errorMessages.includes('description') &&
                <ListItem>
                    <ListItemText>La description est obligatoire et doit contenir plus de 10 caractères</ListItemText>
                </ListItem>
                }
                {errorMessages.includes('genres') &&
                <ListItem>
                    <ListItemText>Le jeu à besoin d'au moins un genre</ListItemText>
                </ListItem>
                }
            </List>

        </Paper>);
    const displayGameStatut = (
        <Paper>
            <Typography variant={"h6"} style={{padding: '2em'}}> {gameStatus} </Typography>
        </Paper>);


    const changeGameState = (properties: string, value: any) => {
        setGameState((prevState => {
            return {
                ...prevState,
                [properties]: value
            }
        }));
    };
    useEffect(() => {
        if (id) {
            GameService.getGame(id).then((value) => {
                    setGameState(new GameModel(value.data.content));
                }
            )
        }
    }, [id]);

    //Handle changes
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValueTabs(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValueTabs(index);
    };


    return (
        <div className={classes.root}>
            <Grid container style={{padding: '1em'}}>
                {!gameState._id &&
                <Button variant="outlined" name='create' onClick={onCreate} color="primary"
                        style={{width: '300px', margin: 'auto'}}
                >Créer</Button>}
                {gameState._id &&
                <Button variant="outlined" onClick={onUpdate} name='update' color="primary"
                        style={{width: '300px', margin: 'auto'}}
                >Modifier
                </Button>}
                {gameState._id &&
                <Button variant="outlined" onClick={onDelete} name='delete' color="default"
                        style={{width: '300px', margin: 'auto'}}
                >Supprimer
                </Button>}
            </Grid>
            {errorMessages.length !== 0 && errorDisplay}
            {gameStatus.length !== 0 && displayGameStatut}
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
                    <Tab
                        className={errorMessages.includes('description')  || errorMessages.includes('description')  || errorMessages.includes('name') ? classes.errorTab : ''}
                        label="Carte d'identité "  {...a11yProps(0)} />
                    <Tab className={errorMessages.includes('genres') ? classes.errorTab : ''}
                         label="Descriptif " {...a11yProps(1)} />
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
                        <GameCreatePanel3 game={gameState} changeGameState={changeGameState} urlReturn={urlPicture} setFile={setFile} key={'gameCreatePanel3'}/>
                    </TabPanel>
                </SwipeableViews>
            </FormContext>
        </div>
    );
};

export default GameCreatePage;