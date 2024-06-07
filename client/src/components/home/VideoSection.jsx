import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import backGround from '../../assets/image/main_section2_bg.jpg'
import DetailModalSection from '@/components/home/DetailModalSection';
import AOS from 'aos';
import 'aos/dist/aos.css';


const VideoSectionBlock = styled.div`
height: 100vh;
.stateBox {
  background: #0059e9;
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-direction: row; /* 기본 방향은 row */
}

.contain {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.textBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1, p {
    color: #fff;
  }
  h1 {
    font-size: 50px;
    padding: 30px 0;
  }
  p {
    font-size: 17px;
    padding: 10px 0 80px;
  }
  a {
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    padding: 10px 30px;
  }
}

.videoBox {
  overflow: hidden;
  position: relative;
  .video {
    position: absolute;
    left: 5%;
    top: 30%;
    display:inline;
    width:100%;
    height:100%;
  }
  img {
    max-width: 100vh;
  }
}

@media (max-width: 1028px) {
    height: 130vh;
    margin-bottom:150px;
  .stateBox {
    flex-direction: column;
  }
  .textBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1, p {
      color: #fff;
    }
    h1 {
      font-size: 50px;
      padding: 30px 0;
    }
    p {
      font-size: 17px;
      padding: 10px 0 80px;
    }
    a {
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      padding: 10px 30px;
      margin:10px
    }
  }
  .videoBox {
    position:relative;
    overflow: hidden;
    display:flex;
    .video {
      position: absolute;
      left: 5%;
      top: 30%;
      display:inline;
      width:100%;
      height:100%;
    }
  }
}
`;

const VideoSection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = ()=>{setModalOpen(false)}

    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
      }, []);
    

    return (
        <VideoSectionBlock>
      <div className='stateBox'>
                <div className='contain'>
                    <div className='textBox' div data-aos="fade-down">
                        <h1>기분좋게 부름</h1>
                        <p>#견적방식 #청소범위 #청소과정 #서비스소개영상</p>
                        <a href='' className='btn' onClick={(e)=>{e.preventDefault(); setModalOpen(true)}}>청소범위 상세보기</a>
                        <DetailModalSection modalOpen={modalOpen} onClose={closeModal} />
                    </div>
                </div>
                <div className='videoBox'div data-aos="fade-up">
                <div className='video'><iframe width="90%" height="50%" src="https://www.youtube.com/embed/Z_mh18XVP1c?si=xraX0Q1TGQUuSRpJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe ></div>
                    <img src={backGround} alt=""  />
                </div>
      </div>
        </VideoSectionBlock>
    );
};

export default VideoSection;