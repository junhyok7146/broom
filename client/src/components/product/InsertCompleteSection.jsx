import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import finish from '@/assets/image/0de41a3c5953fba1755ebd416ec109dd.gif';

const InsertCompleteSectionBlock = styled.div`
  text-align: center;
  min-height: 80vh;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }

  a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const InsertCompleteSection = () => {
 

  return (
    <InsertCompleteSectionBlock>
        <img src={finish} alt="" />
      <p>접수가 완료되었습니다.</p>
      <p>
        <Link to="/">메인으로 돌아가기</Link>
      </p>
    </InsertCompleteSectionBlock>
  );
};

export default InsertCompleteSection;