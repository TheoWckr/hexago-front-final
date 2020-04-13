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
import {ErrorMessagesPanel} from "../../commons/errorMessages";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

export interface PanelProps {
    game: GameModel,

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

    const methods = useForm<GameModel>();

    const onSubmit = (data: any) => {
        setErrorMessage(['Test', 'Bonjour']);
        console.log(data)
    };
    const [gameState, setGameState] = React.useState(new GameModel({}));
    const changeGameState = (properties: string, value: any) => {
        setGameState((prevState => {
            return {
                ...prevState,
                [properties]: value
            }
        }));
        console.log(gameState);
    };
    let {id} = useParams();
    useEffect(() => {
        if (id) {
            GameService.getGame(id).then((value) => {
                    console.log(UtilsAxios.displayReponse(value));
                    console.log(new GameModel(value.data.content));
                    setGameState(new GameModel(value.data.content));
                }
            )
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log('Changement', newValue);
        setValueTabs(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValueTabs(index);
    };


    return (
        <div className={classes.root}>
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
                    <Tab className={errorMessages.length !== 0 ? classes.errorTab :''} label="Game definition"  {...a11yProps(0)} />
                    <Tab label="Game properties " {...a11yProps(1)} />
                    <Tab label="Images " {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormContext {...methods} >
                    {methods.errors.name && <div>'First name is required'</div>}

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

                <input type="submit"/>
            </form>
        </div>
    );
}
