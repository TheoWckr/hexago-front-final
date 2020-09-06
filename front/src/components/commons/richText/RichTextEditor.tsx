import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import "./textfield.css"

/**
 *
 * @param props
 *  - handleEditorChange content = HTML written by user
 *  - initialValue = HTML set by defaults
 *  - height = default height
 * @constructor
 */
export const RichTextEditor = (props: {
                                   handleEditorChange : (content : string, editor :any) => void ,
                                   initialValue? : string,
                                    height? : string
                               }) => {
    console.log("initial value", props.initialValue);

    return (
        <Editor
            initialValue={props.initialValue ? props.initialValue : "Description"}
            init={{
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
}