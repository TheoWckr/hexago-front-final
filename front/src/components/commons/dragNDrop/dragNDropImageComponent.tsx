import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import {Paper} from "@material-ui/core";



function DragNDropImage() {

    useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: Blob) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                console.log('loaded', binaryStr)
            };
            reader.readAsArrayBuffer(file)
        })

    }, []);
    const {getRootProps, getInputProps} = useDropzone();
    const {ref, ...rootProps} = getRootProps();
    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Paper>
        </RootRef>
    )
}
export default DragNDropImage;
