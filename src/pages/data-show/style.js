import styled from "styled-components";

export const DataShowWrapper = styled.div`
    text-align:center;
    min-height: 937px;

    span {
        display: inline-block;
    }

    .head {
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d4d4d4;
    }

    .content {

        .tips {
            position: relative;
            top: -150px;
        }
    }

    .item {
        border-bottom: 1px solid #ededed;
        display: flex;
        align-items: center;
        height: 50px;
    }

    .time {
        width: 300px;
    }

    .type {
        width: 100px;
    }

    .category {
        width: 300px;
    }

    .amount {
        width: 300px;
    }

    .statistics {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;

        .expenses {
            display: inline-block;
            width: 130px;
            margin-left: 20px;
            font-size: 16px;
            font-weight: normal;
        }

        .receipts {
            display: inline-block;
            width: 130px;
            margin-left: 20px;
            font-size: 16px;
            font-weight: normal;
        }

        .netIncome {
            display: inline-block;
            width: 130px;
            margin-left: 20px;
            font-size: 16px;
            font-weight: normal;
        }
    }
`;
