import {useState} from "react";
import React from "react";
import {Button, Snackbar} from "@material-ui/core";


export function useSnack(message : string) {
    const [open,setOpen] = useState(false);
    const openSnack = () => {
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
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                />
            </div>);
    }

    return {
        openSnack,
        snack
    }

}
