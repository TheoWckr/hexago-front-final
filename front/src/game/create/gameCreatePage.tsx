import React, {useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {GameCreatePanel1} from "./gameCreatePanel1";
import GameCreatePanel3 from "./gameCreatePanel3";
import GameCreatePanel2 from "./gameCreatePanel2";
import { GameModel} from "../../models/gameModel";
import {GameService} from "../../services/gameService";
import {UtilsAxios} from "../../utils/utilsAxios";
import {useParams} from "react-router";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;



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
    panel:{
        width:'90%',
        margin:'3%',
       paddingLeft:'20%',
        paddingRight:'20%',
    },
    textField: {
        paddingBottom: '2em',
    },
}));

export default function FullWidthTabs() {
    const classes = useStylesPanelCreatePage();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const[gameState, setGameState] = React.useState(new GameModel({}));
    let { id } = useParams();
    useEffect(() => {
        if(id) {

            GameService.getGame(id).then((value) => {
                    console.log(UtilsAxios.displayReponse(value));
                console.log(new GameModel(value.data.content));
                    setGameState(new GameModel(value.data.content));
                }
            )
        }
    },[]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    variant="fullWidth"
                    aria-label="Game Creation"
                >
                    <Tab label="Game definition" {...a11yProps(0)} />
                    <Tab label="Game properties " {...a11yProps(1)} />
                    <Tab label="Images " {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <GameCreatePanel1  game={gameState} key={'1dqsfsdfqsf'} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <GameCreatePanel2 game={gameState} key={'2qsdfdfqsf'} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <GameCreatePanel3 game={gameState} key={'2qsdfdfqsf'} />
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
