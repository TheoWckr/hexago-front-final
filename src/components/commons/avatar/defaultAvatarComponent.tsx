import React from "react";
import {Avatar, createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        medium: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        large: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
    }),
);
export const DefaultAvatar = (props :{
    name? : string
    size? : 'small' | 'medium' | 'big'
}) => {
    const classes = useStyles();
    const selectClassName = (size?: string) : string => {
        if (size && size.length > 0) {
            if (size === 'small')
                return classes.small
            if (size === 'big')
                return classes.large
        }
            return classes.medium
    }
    return (
        <Avatar alt={props.name ? props.name : ''} className={selectClassName(props.size)} />
    )
}