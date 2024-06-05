import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import coin from '@/assets/image/4634995_coin_coins_financial_money_icon.png';
import master from '@/assets/image/7739522_man_moslem_fasting_islam_icon.png';
import check from '@/assets/image/8675200_ic_fluent_phone_update_checkmark_icon.png';
import report from '@/assets/image/2931174_clipboard_copy_paste_analysis_report_icon.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MapModal from '@/components/home/MapModal';


const BroomSectionBlock = styled.div`
height: 100vh;
padding-top: 150px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
h1{font-size:50px; text-align:center;}
p{font-size:30px; padding-top:10px; color:#999;}
.directing {
    padding-top:100px;
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
    ::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        border-top: 2px dashed #ccc;
        z-index: -1;
    }
    .content {
        padding: 20px;
        text-align:center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .photoBox {
            border-radius: 50%;
            width: 150px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                filter: invert(100%) sepia(82%) saturate(2%) hue-rotate(205deg) brightness(111%) contrast(101%);
            }
        }
        h2{
            padding-top:50px;
            font-size:30px;
        }
        p{
           font-size:16px;
           padding-top:10px;
        }
    }
    .content:nth-child(1) .photoBox { background: #30acd3; }
    .content:nth-child(2) .photoBox { background: #305fd3; }
    .content:nth-child(3) .photoBox { background: #6b30d3; }
    .content:nth-child(4) .photoBox { background: #d3309d; }
}
.broomBtn{
margin-top:30px;
padding:15px 30px;
color:#0059e9;
border:3px solid #0059e9;
font-size:18px;
}

@media (max-width: 768px) {
    padding-top: 100px;
    h1 {
      font-size: 40px;
    }
    p {
      font-size: 24px;
    }
    .directing {
      flex-direction: column;
      padding-top: 50px;
      ::after {
        border-top: none;
      }
      .content {
        padding: 20px 0;
        .photoBox {
          width: 100px;
          height: 100px;
        }
        h2 {
          padding-top: 30px;
          font-size: 24px;
        }
        p {
          font-size: 14px;
        }
      }
    }
    .broomBtn {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
    }
  }
`;

const BroomSection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = ()=>{setModalOpen(false)}

    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
      }, []);

    return (
        <BroomSectionBlock className='row'>
           <div data-aos="fade-down">
                <h1>이렇게 부름</h1>
                <p>#부름이용방법 #예상견적 #결제방법 #서비스지역</p>
           </div>
            <div className='directing' data-aos="fade-right">
                <div className='content'>
                    <div className='photoBox'>
                        <img src={coin} alt="" />
                    </div>
                    <h2>예상요금 확인</h2>
                    <p>청소부름 버튼을 누르신 후<br/>
                    원하시는 서비스를 선택해주세요.
                    </p>
                </div>
                <div className='content'>
                    <div className='photoBox'>
                        <img src={master} alt="" />
                    </div>
                    <h2>예약완료</h2>
                    <p>담당 마스터가 매칭되면<br/>
                    예약이 완료됩니다.
                    </p>
                </div>
                <div className='content'>
                    <div className='photoBox'>
                        <img src={check} alt="" />
                    </div>
                    <h2>전액 후불</h2>
                    <p>청소 완료 후 현장에서 지불하시거나<br/>
                    마스터님 계좌로 입금해주세요.
                    </p>
                </div>
                <div className='content'>
                    <div className='photoBox'>
                        <img src={report} alt="" />
                    </div>
                    <h2>리포트 받기</h2>
                    <p>청소 전후 사진 및 시설진단 결과에<br/>
                    대한 리포트를 확인하세요.
                    </p>
                </div>
            </div>
            <a href='' className='broomBtn' onClick={(e)=>{e.preventDefault(); setModalOpen(true)}} data-aos="fade-up">서비스 지역보기</a>
            <MapModal modalOpen={modalOpen} onClose={closeModal} />
        </BroomSectionBlock>
    );
};

export default BroomSection;