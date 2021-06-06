import styled from "styled-components";

export const VListWrapper = styled.div.attrs(props => ({
    style: {
        height: props.appearH + 'px'
    }
}))`
    width: 100%;
    overflow: auto;
    overflow-x: hidden;

    /* 滚动条 */
    ::-webkit-scrollbar-thumb:horizontal {
      /*水平滚动条的样式*/
      width: 4px;
      background-color: #9f9f9f;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-track-piece {
      background-color: #f4f5fa; /*滚动条的背景颜色*/
      border-radius: 0; /*滚动条的圆角宽度*/
    }
    ::-webkit-scrollbar {
      width: 8px; /*滚动条的宽度*/
      height: 6px; /*滚动条的高度*/
    }
    ::-webkit-scrollbar-thumb:vertical {
      /*垂直滚动条的样式*/
      height: 50px;
      background-color: #1e1b29;
      border-radius: 4px;
      /* outline: 2px solid #000; */
      /* outline-offset: -2px; */
      border: 2px solid #1e1b29;
    }
`;

export const SlidePieceWrapper = styled.div.attrs(props => ({
    style: {
        height: props.slideH + 'px'
    }
}))`
    position: relative;
`;

export const WindowWrapper = styled.div.attrs(props => ({
    style: {
        top: props.scrollDis + 'px'
    }
}))`
    position: absolute;
`