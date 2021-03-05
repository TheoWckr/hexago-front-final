import React, {ChangeEvent,  CSSProperties, Dispatch, SetStateAction} from 'react'
import {Avatar, Box, Button, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DefaultAvatar} from "../avatar/defaultAvatarComponent";


const inputUploadFile: CSSProperties = {
    display: 'none',
};

const imgPreview: CSSProperties = {
    objectFit:"contain",
    maxWidth: "22em",
    maxHeight: "22em",
};

const imgPreviewRounded: CSSProperties = {
    objectFit:"contain",
    maxWidth: "22em",
    maxHeight: "22em",
    borderRadius: '50%'
};

const imgPaperPreview: CSSProperties = {
    width: "10em",
    height: "10em",
    // padding:"8px",
    display:"flex",
    margin:"auto",
};
const imgBoxPreview: CSSProperties = {
    margin:"auto",
    display: 'flex',
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign:"middle"
}
const buttonUploadFile: CSSProperties = {
    display:"flex"
};

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
            cursor: 'pointer',
            boxShadow: '3px 3px 3px 3px grey'
        },
    }),
);

// component own props
interface UploadFileOwnProps { }

// component props
interface UploadFileProps  extends UploadFileOwnProps {
    file : string
    setFile : Dispatch<SetStateAction<File>>
    name ? : string
}
//class DragNDropImage extends Component<UploadFileProps, UploadFileStateProps>  {
const DragNDropAvatar = (props : UploadFileProps) => {
    const classes = useStyles();

    // function to read file as binary and return
    function getFileFromInput(file: File): Promise<any> {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
        });
    }


    function manageUploadedFile(binary: String, file: File) {
        // do what you need with your file (fetch POST, ect ....)
        props.setFile(file)
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        event.persist();
        Array.from(event.target.files!).forEach(file => {
            getFileFromInput(file)
                .then((binary: any) => {
                    manageUploadedFile(binary, file);
                }).catch(function (reason: any) {
                event.target.value = ''; // to allow upload of same file if error occurs
            });
        });
    }
    const button = (<>

            <Button component="span" style={buttonUploadFile}
                    onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
                Ajoutez une image
            </Button>
    </>)

    return (
        <Grid container>
            <Grid item xs={12} alignContent={"center"} alignItems={"center"}>
                    <input accept="image/*" style={inputUploadFile} id="file" multiple={false} type="file"
                           onChange={handleFileChange}/>
                    <label htmlFor="file">
                    <Box style={imgBoxPreview}>
                        {props.file.length > 0 ?
                            <Avatar alt={props.name ? props.name : ''} src={props.file} className={classes.large}/> :
                            <DefaultAvatar size={"big"}/>
                        }
                    </Box>
                    </label>

            </Grid>
        </Grid>
    );

}
export default DragNDropAvatar;