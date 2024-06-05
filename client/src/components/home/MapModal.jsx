import React from 'react';
import styled from 'styled-components';
import map from '../../assets/image/map_img.jpg';
import { IoClose } from "react-icons/io5";

const MapModalBlock = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    background: rgba(0, 0, 0, 0.5);
    display: none;
    &.on {
        display: flex; 
        justify-content: center; 
        align-items: center;
        .content {
            display: block; 
            max-width: 508px; 
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
            h2 { 
                text-align: left; 
                color: #555; 
                padding: 10px; 
                font-size: 20px; 
            }
            p { padding: 5px 0; font-size: 16px;}
            .btn { 
                padding: 20px 0; 
                button { 
                    border: 1px solid #ddd; 
                    padding: 5px; 
                    margin: 0 5px; 
                }
            }
        }
    }
`;

const MapModal = ({ modalOpen, onClose}) => {
    return (
        <MapModalBlock className={modalOpen ? 'on' : ''}>
            <div className="content">
                <button onClick={onClose} className='closeBtn'><IoClose /></button>
            <div className='detail'>
                    <div >
                        <h2>서비스 지역보기</h2>
                        <p>부름은 아래지역에서</p>
                        <p>부르실 수 있습니다.</p>
                    </div>
                    <div><img src={map} alt="" /></div>
                    <div>
                        <p>일부 지역의 경우</p>
                        <p>서비스 이용이 불가능 할 수 있습니다.</p>
                    </div>
            </div>
            </div>
        </MapModalBlock>
    );
};

export default MapModal;