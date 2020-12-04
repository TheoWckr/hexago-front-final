import {createContext, useState} from "react";
import React from "react";
import {IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export interface SnackContextType {
    openSnack:(input : string) => void
}
export const SnackContext =  createContext<SnackContextType>({
    openSnack : input => {}
});

export function useSnack(messageProvided? : string) {
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState(messageProvided? messageProvided :"");

    const openSnack = (messageProvided? : string) => {
        if(messageProvided)
            setMessage(messageProvided);
        setOpen(true);
    }

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const snack = () => {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={message}

                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>);
    }

    return {
        openSnack,
        snack
    }
}
