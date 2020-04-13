import {Editor, EditorState, RichUtils} from 'draft-js';
import React, {useState} from "react";
export const RichTextEditor = () =>{

        let [state, setState] = useState({editorState: EditorState.createEmpty()});
        const onChange = (editorState: any) => setState({editorState});

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

        return (
            <Editor
                editorState={state.editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={onChange}
            />
        );

};