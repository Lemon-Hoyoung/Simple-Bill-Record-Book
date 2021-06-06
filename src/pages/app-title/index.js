import React, { memo } from 'react'
import { AppTitleWrapper } from './style';

export default memo(function HYAppTitle() {
    return (
        <AppTitleWrapper>
            <div className="mainContent title">
                <a className="title-content" href="/">账单管理</a>
            </div>
        </AppTitleWrapper>
    )
})
