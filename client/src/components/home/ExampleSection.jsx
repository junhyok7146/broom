import React,{useEffect} from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SliderSection2Block = styled.div`
  margin: 50px auto;
  padding: 0 20px;
  max-width: 1200px;
  text-align: center;
  height: 100vh;
  .content{
    padding:300px 0;
  }
  .slick-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 30px;
    color: black;
    background: transparent;
    z-index: 1;

    &.slick-prev {
      left: 0%;
      border-bottom:1px solid #000;
    }

    &.slick-next {
      right: 0%;
      border-bottom:1px solid #000;
    }
  }

  .text {
    margin-bottom: 20px;

    h2 {
      margin-bottom: 10px;
      font-size: 2rem;
      color: #333;
    }

    p {
      margin-bottom: 20px;
      font-size: 1rem;
      color: #666;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }

      a {
        color: white;
        text-decoration: none;
      }
    }
  }

  .slideBox {
    
    .slick-slide > div {

      display: flex;
      justify-content: center;
    }
  }

  .photoBox {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 20px;
    margin: 10px;
    transition: transform 0.3s;
    text-align: left;
    height:340px;
    &:hover {
      transform: translateY(-10px);
    }

    img {
      max-width: 100px;
      margin-bottom: 20px;

    }

    h3 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 10px;
    }

    p {
      font-size: 0.9rem;
      color: #666;
      text-align: center;
    }
  }
  @media (max-width: 768px) {
    margin-bottom:150px;
    .text h2 {
      font-size: 1.6rem;
    }

    .text p {
      font-size: 0.8rem;
    }

    .text button {
      padding: 6px 12px;
      font-size: 0.8rem;
    }

    .photoBox {
      padding: 10px;
      height: 250px;
    }

    .photoBox img {
      max-width: 60px;
    }

    .photoBox h3 {
      font-size: 0.9rem;
    }

    .photoBox p {
      font-size: 0.7rem;
    }
  }
`;

const SliderSection2 = () => {
  const options = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const sliders = [
    {
      image1: "./assets/image/img_piggybank.png",
      alt: "img",
      text: "99,000원부터",
      explan: "욕실, 주방, 창 99,000원부터 꼭 필요한 곳만 청소 가능",
    },
    {
      image1: "./assets/image/img_optimization.png",
      alt: "img",
      text: "소형 공간",
      explan: "전용면적 16평 이하 주거공간에 최적화된 맞춤 견적 제공",
    },
    {
      image1: "./assets/image/img_estimate.png",
      alt: "img",
      text: "중대형",
      explan: "꼭 필요한 장비와 도구만을 사용하여 가격 거품 제거",
    },
    {
      image1: "./assets/image/img_clean.png",
      alt: "img",
      text: "공간별 청소도구",
      explan: "화장실, 주방, 공용 등 걸레와 도구를 구분하여 사용합니다.",
    },
    {
      image1: "./assets/image/img_manage.png",
      alt: "img",
      text: "3단계 검증을 통과한 마스터",
      explan: "청소 테스트, 고객응대 테스트, 신원확인을 거쳐야만 부름의 마스터가 될 수 있습니다.",
    },
    {
      image1: "./assets/image/img_images.png",
      alt: "img",
      text: "청소 리포트 제공",
      explan: "청소 전후 사진과 점검결과까지 한눈에 확인하세요.",
    },
    
  ];

  return (
    <SliderSection2Block>
      <div className='content'>
        <div className="text" data-aos="fade-down" data-aos-anchor-placement="top-center">
          <h2>합리적으로 부름</h2>
          <p>#실속형9만9천원 #가성비 #가격거품제거</p>
          <button>
            <a href="https://blog.naver.com/cleanbroom" target='_blank'>청소사례 보기</a>
          </button>
        </div>
        <div className="slideBox" data-aos="fade-up" data-aos-anchor-placement="top-center">
          <Slider {...options}>
            {sliders.map((item, index) => (
              <div key={index} className="photoBox">
                <img src={item.image1} alt={item.alt} />
                <h3>{item.text}</h3>
                <p>{item.explan}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </SliderSection2Block>
  );
};

export default SliderSection2;