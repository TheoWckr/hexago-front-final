import {GameEditProps} from "../../models/propsDeclaration";
import React from "react";
import {Grid, Typography, ListItem, List, ListItemText, Theme, createStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {lightGreen} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding:'2em',
        },
        demo: {
            backgroundColor: theme.palette.info.light,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);


export const ErrorMessagesPanel = (props:{
errorMessages : string[]}) =>{
    const classes = useStyles();

    const itemList = props.errorMessages.map((error) =>
        <ListItem>
            <ListItemText
                primary={error}
            />
        </ListItem>,
    );
    return (<div>
        <Typography variant="h6" >
            Errors
        </Typography>
        <Grid container spacing={2} className={classes.root}>

                <div className={classes.demo}>
                    <List dense={true}>
                       {itemList}
                    </List>
                </div>
            </Grid>

    </div>)

};