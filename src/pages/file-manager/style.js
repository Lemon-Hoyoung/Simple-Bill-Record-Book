import styled from "styled-components";

export const FileManagerWrapper = styled.div`
    margin: 0 auto;
    padding: 20px;
    position: relative;
    background-color: #f4f5fa;
    min-height: 180px;

    .file-operate {
        position: relative;
        height: 32px;
        margin-bottom: 20px;
        padding-bottom: 60px;
        border-bottom: 1px solid #d4d4d4;

        .pop {
            top: 8px;
            width: 16px;
            height: 16px;
            background-position: 0 0;
        }

        .popBill {
            position: absolute;
            left: 250px;
        }

        .popInfo {
            position: absolute;
            right: 186px;
        }


        .file-import {
            float: left;
            margin-right: 20px;
        }

        .file-select {
            width: 100px;
            display: inline-block !important;
            position: absolute;
        }

        .file-info {
            float: right;
        }
    }

    .file-filter {
        margin-top: 10px;

        position:relative;
        height: 40px;
        display: flex;
        align-items: center;
        .file-time {
            font-weight: bold;
        }

        .allTimeCheck {
            margin-left: 20px;
        }

        .file-type {
            font-weight: bold;
            position: absolute;
            right: 100px;
        }

        .type-select {
            width: 100px;
            position: absolute;
            right: 0px;
            display: inline-block
        }
    }

`;
