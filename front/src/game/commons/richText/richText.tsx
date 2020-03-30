import {Editor, EditorState, RichUtils} from 'draft-js';
import React from "react";
export class RichTextEditor extends React.Component {
    private readonly onChange: (editorState: any) => void;
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = editorState => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
    handleKeyCommand(command: string, editorState: EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    render() {
        return (
            <Editor
                editorState={EditorState.createEmpty()}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
            />
        );
    }
}
