import React, { useEffect } from 'react';
import BoardList from '@/components/board/BoardList'
import styled from 'styled-components';

const BoardListBlock = styled.div`
padding-top:150px; 
`
const BoardListView = () => {

    return (
        <BoardListBlock className="row">
            <BoardList />
        </BoardListBlock>
    );
};

export default BoardListView;