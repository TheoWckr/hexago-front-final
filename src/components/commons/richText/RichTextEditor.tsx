import React from "react";
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
        <div></div>
    )
};
