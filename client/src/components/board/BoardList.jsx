import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeType, fetchNotice, fetchReview, setPage } from '@/store/board';
import dayjs from 'dayjs';

const BoardListBlock = styled.div`
margin: 0 auto 50px;
max-width: 1200px;
padding: 0 20px;

h1, p {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  white-space:nowrap;


  th, td {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    text-align: center;
    overflow : hidden;
    text-overflow:ellipsis;

    &:nth-child(2) {
      text-align: center;
    }
  }

  th {
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
    text-align: center;
  }

  tr:first-child th, tr:first-child td {
    border-top: none;
  }
}
  .btn {
    text-align: center;

    a {
      display: inline-block;
      padding: 10px 20px;
      background: #0059e9;
      color: #fff;
      border-radius: 5px;
      text-decoration: none;
      transition: background 0.3s;
      margin-top:20px;
    }
  }

  .pagebutton {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;

    button {
      padding: 5px 9px;
      background: #ddd;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.3s, color 0.3s;

      &.on {
        background: #0059e9;
        color: #fff;
      }

      &:hover:not(.on) {
        background: #ccc;
      }
    }
  }
  @media (max-width: 480px){

  }
  
`;

const BoardList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.members.user);
  const { list, type, totalCount, currentPage } = useSelector(state => state.boards);

  const totalPages = Math.ceil(totalCount / 10);

  useEffect(() => {
    if (type === "notice") {
      dispatch(changeType("notice"));
      dispatch(fetchNotice(1));
    } else {
      dispatch(changeType("review"));
      dispatch(fetchReview(1));
    }
  }, [dispatch, type]);

  useEffect(() => {
    if (type === "notice") {
      dispatch(fetchNotice(currentPage));
    } else {
      dispatch(fetchReview(currentPage));
    }
  }, [dispatch, currentPage]);

  return (
    <BoardListBlock>
      <h1>공지 사항</h1>
      <p>부름에서 다양한 이벤트를 확인하세요</p>
      <table>
        <colgroup>
          <col style={{ width: '50px' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width:  'auto'}} />
          <col style={{ width: '110px' }} />
          <col style={{ width: '50px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 && list.map((post, index) => (
            <tr key={index}>
              <td>{totalCount - ((currentPage - 1) * 10 + index)}</td>
              <td><Link to={`/boardList/${post.subject}`} state={{ post: post }}>{post.subject}</Link></td>
              <td>{post.writer}</td>
              <td>{dayjs(post.date).format('YYYY-MM-DD')}</td>
              <td>{post.hit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagebutton">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === (i + 1) ? "on" : ""}
            onClick={() => { dispatch(setPage(i + 1)); }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {type === "notice" && user && user.userId === "tsalt@hanmail.net" &&
        <div className="btn">
          <Link to="/boardWrite">글쓰기</Link>
        </div>
      }
    </BoardListBlock>
  );
};

export default BoardList;