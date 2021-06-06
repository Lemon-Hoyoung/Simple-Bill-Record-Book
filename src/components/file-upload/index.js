import React, { memo, useRef, useCallback } from 'react'
import { FileUploaderWrapper } from './style';

export default memo(function HYFileUploader(props) {
    const inputRef = useRef();
    const { uploadCb = () => {}, children, className } = props

    const uploadFile = useCallback(() => {
        inputRef.current.value = "";
        inputRef.current.click();
    }, [])
    return (
        <FileUploaderWrapper onClick={uploadFile} className={className}>
            <span className="upload-content">{typeof children === "string" && children}</span>
            <input type="file" onChange={e => uploadCb(e.target)} className="upload-input" ref={inputRef} />
        </FileUploaderWrapper>
    )
})
