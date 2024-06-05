import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
const QnASectionBlock = styled.div`
  padding-top: 150px;
  .top{
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    left:50%;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }
  .box{
    border-top:2px solid #000;
  }
  .question {
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    &:hover {
      color: #003bb5;
    }
  }
  .depth1 {
    padding: 15px;
    border-bottom: 1px solid #ddd;

    ul.depth2 {
      margin-top: 10px;
      padding-left: 20px;
      display: none;
      li {
        font-size: 1rem;
        color: #333;
      }
    }
    ul.depth2.show {
      display: block;
    }
  }
`;

const QnASection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "현금영수증 발급이 되나요?",
      answer: "관련 사항은 고객센터로 문의해 주세요."
    },
    {
      question: "예약은 언제까지 하는 것이 좋을까요?",
      answer: "희망하시는 날짜에 예약이 마감되어 서비스 제공이 불가할 수 있으므로 청소일로부터 2~3주 전에 예약을 완료하시는 것이 좋습니다. 기존 거주자의 퇴거 및 고객님의 입주 일정이 정해지면 최대한 빠르게 접수해 주세요."
    },
    {
      question: "결제는 어떻게 하나요? 카드결제가 되나요?",
      answer: "부름은 전액 후불 결제 서비스입니다. 현재 카드결제는 불가능하며, 청소완료일에 마스터 계좌로 이체하시거나 현금으로 지불해 주세요."
    },
    {
      question: "마스터는 몇 분이 오시나요?",
      answer: "소형 주거공간의 경우, 부름에서 검증을 완료한 한 명의 책임 마스터가 방문합니다. 상황에 따라 두 명의 인원이 방문할 수 있으나, 청소의 품질 및 가격의 차이는 없습니다. 중대형 주거공간의 경우, 확보 가능한 청소 시간 및 면적에 따라 투입되는 인원이 달라지므로, 매칭 후 상담이 필요합니다."
    },
    {
      question: "청소는 얼마나 걸리나요?",
      answer: "평균 3~5시간 정도 소요되며, 현장 상황에 따라 달라질 수 있습니다. 현장 확인을 위해 청소 완료 약 30분 전에 고객님께 연락드리고 있습니다."
    },
    {
      question: "방충망도 청소해 주나요?",
      answer: "틀 청소만 진행되며, 파손 위험으로 인해 망은 청소범위에서 제외됩니다."
    },
    {
      question: "실속형 서비스는 무엇인가요?",
      answer: "셀프 청소를 진행할 때 가장 힘들고, 많은 시간이 소요되는 공간(화장실, 주방, 창)만 진행하는 서비스입니다. 이사 후에도, 거주 중에도 이용하실 수 있습니다. *실면적 기준 12평 이하에서만 이용하실 수 있습니다."
    },
    {
      question: "추가 요금은 어떤 경우에 발생되나요?",
      answer: `현장 방문 후 추가 요금이 발생되는 경우는 아래와 같습니다.
              ※ 부름은 일인가구에 최적화하여 방문 전 세분화된 견적을 제공하지만, 미리 눈으로 확인하지 못한 상황 및 투입되는 약품(특수세제, 전용약품 등)의 양에 대비하여 일부 금액이 추가될 수도 있다는 점 양해부탁드립니다.
              - 면적, 집의 구조 등이 접수된 내용과 다른 경우
              - 층고 3미터 이상으로 사다리 작업이 필요한 경우
              - 곰팡이, 찌든때로 인한 오염도가 매우 심하거나 면적이 넓어 작업 시간이 현저히 늘어나는 경우
              - 반려동물(개, 고양이 등)로 인한 오염 및 털 제거가 필요한 경우
              - 한 공간(방, 주방, 화장실 등)에 2세트 이상의 창이 있는 경우
              - 인테리어 등 공사 잔해가 많아 작업 시간이 현저히 늘어나는 경우
              - 블라인드 청소시
              - 쓰레기의 양이 20L를 초과하는 경우
              (50L당 1만원. 단, 종량제봉투값은 별도이며, 20L 이하 봉투 준비시 무료)
              - 예약 당일 고객님의 사정으로 인해 서비스 시작이 지연될 경우(30분당 1만원)
              ※ 선택사항
              아래의 경우 마스터에 따라 서비스가 불가능할 수 있으므로 접수 시에 말씀해 주세요.
              - 스티커, 시트지, 본드자국, 에어캡(뽁뽁이) 제거 작업 필요시
              - 피톤치드 시공
              - 에어컨 분해청소`
    },
    {
      question: "청소가 진행될 때 현장에 없어도 되나요?",
      answer: "네, 담당 마스터에게 출입 방법에 대해서 미리 안내해 주셨다면, 청소 완료 시점에 현장에 오셔서 확인만 해주시면 됩니다."
    },
    {
      question: "청소가 끝나고 잘 안된 부분이 있으면 A/S 신청이 가능한가요?",
      answer: "당일 A/S를 원칙으로 하며, 청소 완료 시점에 미흡하거나 불만족스러운 부분을 말씀해 주시면 현장에서 즉시 A/S 처리해 드립니다. 단, 청소 당일 현장 확인이 불가능하신 경우, 청소완료일로부터 3일 이내에 불편사항 접수시 재방문하여 처리해 드리고 있습니다."
    }
  ];

  return (
    <QnASectionBlock className='row'>
      <div className='top'>
          <h1>자주 묻는 질문</h1>
          <p>부름 이용과 관련하여 어떤 점이 궁금하신가요?</p>
      </div>
      <div className='box'>
          {questions.map((q, index) => (
            <div className='depth1' key={index}>
              <div className='question' onClick={() => toggleQuestion(index)} style={{ display:'flex', justifyContent:"space-between" }}>
                <span><AiOutlineQuestionCircle style={{ marginRight: '10px', color:'#0059e9' }} /> {q.question}</span><span><FaCaretDown/></span>
              </div>
              <ul className={`depth2 ${activeIndex === index ? 'show' : ''}`}>
                <li><IoIosCheckmarkCircleOutline style={{ marginRight: '10px', color:'#0059e9' }} />{q.answer}</li>
              </ul>
            </div>
          ))}
      </div>
    </QnASectionBlock>
  );
};

export default QnASection;