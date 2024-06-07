import React, { useEffect } from 'react';
import BoardList from '@/components/board/BoardList'
import styled from 'styled-components';
import FindLocation from '@/components/layout/FindLocation'

const BoardListBlock = styled.div`
padding-top:150px; 
`
const BoardListView = () => {

    return (
        <BoardListBlock className="row">
            <FindLocation/>
            <BoardList />
        </BoardListBlock>
    );
};

export default BoardListView;