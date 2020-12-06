import React, {ChangeEvent,  CSSProperties, Dispatch, SetStateAction} from 'react'
import {Box, Button, Grid, Paper} from "@material-ui/core";


const inputUploadFile: CSSProperties = {
    display: 'none',
};

const imgPreview: CSSProperties = {
    objectFit:"contain",
    maxWidth: "22em",
    maxHeight: "22em",
};

const imgPaperPreview: CSSProperties = {
    width: "25em",
    height: "25em",
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

// component own props
interface UploadFileOwnProps { }

// component props
interface UploadFileProps  extends UploadFileOwnProps {
    file : string
    setFile : Dispatch<SetStateAction<File>>
}
//class DragNDropImage extends Component<UploadFileProps, UploadFileStateProps>  {
const DragNDropImage = (props : UploadFileProps) => {
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
            <input accept="image/*" style={inputUploadFile} id="file" multiple={false} type="file"
                   onChange={handleFileChange}/>
            <label htmlFor="file">
                <Button component="span" style={buttonUploadFile}
                        onClick={(e: { stopPropagation: () => void; }) => e.stopPropagation()}>
                    Ajoutez une image
                </Button>
            </label>
        </>)

    return (
        <Grid container style={ {margin : "auto"}}>
            <Grid item xs={12}>
                <Paper elevation={3} style={imgPaperPreview}>
                    <Box style={imgBoxPreview}>
                        {props.file.length > 0 && <img src={props.file} alt={""} style={imgPreview}/>}
                        {button}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );

}
export default DragNDropImage;