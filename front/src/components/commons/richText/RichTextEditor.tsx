import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import "./textfield.css"

/**
 *
 * @param props
 *  - handleEditorChange content = handler for HTML written by user
 *  - initialValue = HTML set by defaults
 *  - height = default height
 *  - width = default width

 * @constructor
 */
export const RichTextEditor = (props: {
                                    handleEditorChange : (content : string, editor :any) => void ,
                                    initialValue? : string,
                                    height? : string,
                                    width?: string
                               }) => {
    return (
        <Editor
            initialValue={props.initialValue ? props.initialValue : "Description"}
            init={{
                width: props.width ? props.width : "auto",
                height: props.height ? props.height : "250",
                menubar: false,
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={props.handleEditorChange}
        />
    )
};
