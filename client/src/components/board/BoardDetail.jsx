import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const serverUrl = import.meta.env.VITE_API_URL;

const BoardDetailBlock = styled.div`
  max-width: 600px;
  margin: 0 auto 50px;
  padding: 20px;
  h2 {
    margin-bottom: 20px;
    font-size: 40px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    td {
      padding: 10px;

      input[type='text'],
      textarea {
        width: 100%;
        background:#fff;
        padding: 10px;
        margin: 0;
        font-size: 14px;
        background-color: #ffffff;
        border:none;
      }
      textarea {
        height: 150px;
        resize: none;
        border:none;
      }
    }
  }

  .btn-group {
    margin-top: 20px;
    text-align: center;

    button,
    a {
      margin: 0 10px;
      padding: 10px 20px;
      background: #007bff;
      color: #ffffff;
      font-size: 14px;
      text-decoration: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const BoardDetail = ({ post }) => {
  const type = useSelector((state) => state.boards.type);
  const user = useSelector((state) => state.members.user);
  const currentPage = useSelector((state) => state.boards.currentPage);
  const navigate = useNavigate();
  const severUrl = import.meta.env.VITE_API_URL
  const onRemove = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (type === 'notice') {
        response = await axios.get(`${serverUrl}/board/notice/remove?no=${post.noNo}`);
        if (response.data.affectedRows === 1) {
          navigate('/boardList', { state: { page: currentPage } });
        } else {
          alert('삭제하지 못했습니다.');
        }
      } else if (type === 'review') {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (type === 'notice') {
      axios
        .get(`${serverUrl}/board/notice/hit?no=${post.noNo}&hit=${post.hit}`)
        .then((res) => {
          if (res.data.affectedRows === 1) {
            console.log('증가했습니다.');
          } else {
            console.log('증가하지 못했습니다.');
          }
        })
        .catch((err) => console.error('Error:', err));
    } else if (type === 'review') {
    }
  }, []);

  return (
    <BoardDetailBlock>
      <h2>{post.subject}</h2>
      <table>
        <tbody>
          <tr style={{borderBottom:" 1px solid #eeeeee"}}>
            <td>작성자</td>
            <td>
              <input type="text" name={post.writer} value={post.writer} disabled  />
            </td>
          </tr>
          <tr>
            <td>
              <textarea name="content" value={post.content} disabled></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-group">
        {user && post.writer === user.userId && (
          <>
            <Link to={`/boardModify/${post.subject}`} state={{ post: post }}>
              수정
            </Link>
            <button onClick={onRemove}>삭제</button>
          </>
        )}
        <Link to="/boardList" state={{ page: currentPage }}>
          목록
        </Link>
      </div>
    </BoardDetailBlock>
  );
};

export default BoardDetail;