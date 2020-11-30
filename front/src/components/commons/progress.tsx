import React from 'react';
import { CircularProgress } from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionLoader: {
        	position: "absolute",
        	zIndex: 9998,
        },

        spinner: {
        	position: "absolute",
        	top: "50%",
        	left: "50%",
        	zIndex: 9999,
        	transform: "translate(-50%, -50%)",
        	animation: ""
        }
    }),
);

export const SectionLoader = () => {
	const classes = useStyles();

	return (
		<div className={classes.sectionLoader}>
			<CircularProgress className={classes.spinner}/>
		</div>
	);
};