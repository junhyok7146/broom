import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";


const FindLocation = () => {
    const location = useLocation();
    const pathMap = {
        '/': 'Home',
        '/cart': <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#0059e9',justifyContent:'center'}}>
                    <span><IoMdHome style={{fontSize: '25px'}}/></span><FaArrowRight style={{fontSize: '10px'}}/><span style={{fontSize: '12px', display:'flex', alignItems:'center'}}>마스터</span><FaArrowRight style={{fontSize: '10px'}}/><span  style={{fontSize: '12px', display:'flex', alignItems:'center'}}>예약관리</span>
                </div>,
        '/myOrder': <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#0059e9',justifyContent:'center'}}>
                    <span><IoMdHome style={{fontSize: '25px'}}/></span><FaArrowRight style={{fontSize: '10px'}}/><span style={{fontSize: '12px', display:'flex', alignItems:'center'}}>마스터</span><FaArrowRight style={{fontSize: '10px'}}/><span  style={{fontSize: '12px', display:'flex', alignItems:'center'}}>예약현황</span>
                </div>,
        '/productApply': <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#0059e9',justifyContent:'center'}}>
                            <span><IoMdHome style={{fontSize: '25px'}}/></span><FaArrowRight style={{fontSize: '10px'}}/><span style={{fontSize: '12px', display:'flex', alignItems:'center'}}>나의 부름</span><FaArrowRight style={{fontSize: '10px'}}/><span  style={{fontSize: '12px', display:'flex', alignItems:'center'}}>청소부름</span>
                        </div>,
        '/reservation': <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#0059e9',justifyContent:'center'}}>
                            <span><IoMdHome style={{fontSize: '25px'}}/></span><FaArrowRight style={{fontSize: '10px'}}/><span style={{fontSize: '12px', display:'flex', alignItems:'center'}}>나의 부름</span><FaArrowRight style={{fontSize: '10px'}}/><span  style={{fontSize: '12px', display:'flex', alignItems:'center'}}>완료내역</span>
                        </div>,
        '/boardList': <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#0059e9',justifyContent:'center'}}>
                             <span><IoMdHome style={{fontSize: '25px'}}/></span><FaArrowRight style={{fontSize: '10px'}}/><span style={{fontSize: '12px', display:'flex', alignItems:'center'}}>고객센터</span><FaArrowRight style={{fontSize: '10px'}}/><span  style={{fontSize: '12px', display:'flex', alignItems:'center'}}>공지사항</span>
                        </div>,
        '/qna': <div style={{display:'flex', gap:'10px', alignItems:'center', color:'#0059e9',justifyContent:'center'}}>
                            <span><IoMdHome style={{fontSize: '25px'}}/></span><FaArrowRight style={{fontSize: '10px'}}/><span style={{fontSize: '12px', display:'flex', alignItems:'center'}}>고객센터</span><FaArrowRight style={{fontSize: '10px'}}/><span  style={{fontSize: '12px', display:'flex', alignItems:'center'}}>자주 묻는 질문</span>
                        </div>,
        // 필요한 다른 경로와 치환할 단어를 추가합니다.
      };
      const currentPath = location.pathname + location.search + location.hash;
    
      const getFriendlyName = (path) => pathMap[path] || path;
  
    return (
      <div>
        {getFriendlyName(currentPath)}
      </div>
    );
  };

export default FindLocation;