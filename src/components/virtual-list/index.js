import React, { memo, useCallback, useState } from 'react'
import { VListWrapper, SlidePieceWrapper, WindowWrapper } from './style'

export default memo(function VList(props) {
    const { appearH = 0, itemH = 0, children, ItemMap = {}, DataSet } = props;
    const [indexObj, setIndex] = useState({ up: 0, down: Math.floor(appearH / itemH) + 10, distance: 0 });

    const scrollCb = useCallback((e) => {
        const scrollDis = e.target.scrollTop;
        const upIndex = Math.floor(scrollDis / itemH);
        const downIndex = Math.floor(upIndex + (appearH / itemH));
        setIndex({up: upIndex, down: downIndex + 10, distance: upIndex * itemH});
    }, [itemH, appearH]);

    return (
        <VListWrapper appearH = {appearH} onScroll={scrollCb}>
            <SlidePieceWrapper slideH = {Number(itemH) * Number(children ? children.length : DataSet ? DataSet.length : 0)}>
                <WindowWrapper scrollDis={indexObj.distance}>
                    {
                        children && children.slice(indexObj.up, indexObj.down + 1)
                    }
                    {
                        DataSet && DataSet.slice(indexObj.up, indexObj.down + 1).map((item) => {
                            let Props = {};
                            for (let key in ItemMap) {
                                if (key !== "Moudule")
                                Props[key] = item[ItemMap[key]];
                            }
                            return <ItemMap.Module {...Props}/>;
                        })
                    }
                </WindowWrapper>
            </SlidePieceWrapper>
            
        </VListWrapper>
    )
})