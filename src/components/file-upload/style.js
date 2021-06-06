import styled from 'styled-components';

export const FileUploaderWrapper = styled.div`
    height: 32px;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    color: #fff;
    line-height:1.5715;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    border:1px solid transparent;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    white-space: nowrap;
    cursor: pointer;
    border-radius: 2px;
    padding: 0px 15px;
    font-size: 14px;

    &:hover {
        background-color: #40a9ff;
        border-color: #40a9ff;
    }

    .upload-input {
        width:0;
        height:0;
    }
`