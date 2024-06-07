import React from 'react';
import styled from 'styled-components';

import { IoClose } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

const DetailModalSectionBlock = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0; 
background: rgba(0, 0, 0, 0.5);
display: none;
z-index:99;
width:400px;
&.on {
    display: flex; 
    justify-content: center; 
    align-items: center;
    .modalContent {
        overflow: auto;
        display: block; 
        max-width: 500px; 
        height:600px;
        color: #555; 
        background: #fff; 
        text-align:right;
        .closeBtn{
            background:transparent;
            font-size:30px;
            color:#555;
            padding:10px;
            
        }
        .detail{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding:0 20px 30px;
            text-align:center;
        }
        h1 { 
            text-align: left; 
            color: #555; 
            padding: 10px; 
            font-size: 20px; 
        }
        }
    }
}
.modal{
    td{
    border-bottom:1px solid #ddd;
    padding:10px;
}
td:nth-child(1){}
td:nth-child(2){ color:#f8ce46;}
td:nth-child(3){ color:#0059e9;}
td:nth-child(4){ color:#976fdd;}
tr:nth-child(1){background:#ddd;}
}


::-webkit-scrollbar {
  width: 12px; 
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}


::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px; 
}


::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`


const DetailModalSection = ({ modalOpen, onClose}) => {
    return (
        <DetailModalSectionBlock className={modalOpen ? 'on' : ''}>
            <div className="modalContent">
            <button onClick={onClose} className='closeBtn'><IoClose /></button>
            <div className='detail'>
            <h1>서비스 유형 비교</h1>
            <table className='modal'>
	 	<tr> 
	 		<td>화장실</td>
	 		<td>실속형</td>
	 		<td>기본형</td>
	 		<td>고급형</td>
	 	</tr>
	 	
	 	<tr> 
	 		<td>환풍구</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
	 	
	 	<tr>
         <td>배수구</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>샤워부스</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>변기</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>수전</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>천장</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>벽과 바닥</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>창(창호,창틀,방충망 틀)</td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>*전등 커버(바깥면)</td>
	 		<td></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>전등커버(분리청소)</td>
	 		<td></td>
	 		<td></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
         <tr>
         <td>알콜 전체 소독(전체면)</td>
	 		<td></td>
	 		<td></td>
	 		<td><GiCheckMark style={{color:"#0059e9"}}/></td>
	 	</tr>
	 </table>
            </div>
            </div>
        </DetailModalSectionBlock>
    );
};

export default DetailModalSection;